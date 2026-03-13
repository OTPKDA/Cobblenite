import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ── Rate limiting strict pour éviter le brute-force ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max 5 essais
const RATE_WINDOW = 60_000; // par minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return NextResponse.json({ valid: false, error: "Trop de tentatives, reessaie dans 1 minute" }, { status: 429 });
    }

    const body = await req.json();
    const code = typeof body?.code === "string" ? body.code.trim() : "";

    if (!code || code.length < 2 || code.length > 30 || !/^[A-Za-z0-9_-]+$/.test(code)) {
      return NextResponse.json({ valid: false });
    }

    const promoCodes = await stripe.promotionCodes.list({
      code: code.toUpperCase(),
      active: true,
      limit: 1,
      expand: ["data.coupon"],
    });

    if (promoCodes.data.length === 0) {
      return NextResponse.json({ valid: false });
    }

    const promo = promoCodes.data[0];
    const coupon = promo.promotion.coupon as Stripe.Coupon | null;

    if (!coupon) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({
      valid: true,
      code: promo.code,
      percentOff: coupon.percent_off || null,
      amountOff: coupon.amount_off ? coupon.amount_off / 100 : null,
      name: coupon.name || promo.code,
    });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
