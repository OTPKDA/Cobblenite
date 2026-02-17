import { NextResponse } from "next/server";

const MC_IP = "79.137.34.10:25565";

export async function GET() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${MC_IP}`, {
      next: { revalidate: 30 },
    });
    const data = await res.json();
    return NextResponse.json({
      online: data.online ?? false,
      players: data.players ?? null,
    });
  } catch {
    return NextResponse.json({ online: false, players: null });
  }
}
