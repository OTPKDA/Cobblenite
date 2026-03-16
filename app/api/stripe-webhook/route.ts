import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "http://163.5.59.238:4242/webhook";

export async function POST(req: NextRequest) {
  try {
    // Forward raw body + Stripe-Signature header to the VPS webhook server
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature") || "";

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Stripe-Signature": sig,
      },
      body: rawBody,
    });

    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Webhook proxy error" }, { status: 502 });
  }
}
