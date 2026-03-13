import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId || typeof sessionId !== "string" || sessionId.length > 200) {
    return NextResponse.json({ error: "session_id manquant" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Paiement non confirme" }, { status: 402 });
    }

    const playerName = session.metadata?.player_name || "";
    const productIds: string[] = JSON.parse(session.metadata?.product_ids || "[]");
    const amountTotal = (session.amount_total || 0) / 100;

    return NextResponse.json({
      playerName,
      productIds,
      amountTotal,
      currency: session.currency || "eur",
      createdAt: session.created,
    });
  } catch {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }
}
