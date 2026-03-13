"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

// Noms affichables des produits
const PRODUCT_NAMES: Record<string, string> = {
  "vip-trainer": "Pass Dresseur",
  "vip-plus": "Pass Dresseur+",
  "pack-starter": "Kit du Dresseur",
  "pack-combat": "Pack Arene",
  "pack-shiny": "Etoile Chromee",
  "pack-legendaire": "Coffre du Champion",
  "pack-legendaire-shiny": "Relique Ancestrale",
  "cd-5000": "5 000 CobbleDollars",
  "cd-15000": "15 000 CobbleDollars",
  "cd-50000": "50 000 CobbleDollars",
  "cd-100000": "100 000 CobbleDollars",
  "cd-250000": "250 000 CobbleDollars",
  "cd-500000": "500 000 CobbleDollars",
  "gacha-1": "1 Jeton Gacha",
  "gacha-5": "5 Jetons Gacha",
  "gacha-10": "10 Jetons Gacha",
  "gacha-25": "25 Jetons Gacha",
  "gacha-50": "50 Jetons Gacha",
  "fossil-talent": "Fossile Talent Cache",
  "fossil-shiny": "Fossile Shiny",
  "fossil-maxiv": "Fossile Max IV",
  "fossil-parfait": "Fossile Parfait",
  "upsell-choose-pokemon": "Choisis ton Pokemon",
  "upsell-ev-max": "EV Training Max",
  "upsell-shiny": "Shiny Boost",
  "upsell-iv": "IV Parfaits",
  "upsell-double-cd": "Double CobbleDollars",
  "upsell-gacha5": "+5 Jetons Gacha",
  "upsell-vip-extend": "VIP Etendu",
};

type OrderData = {
  playerName: string;
  productIds: string[];
  amountTotal: number;
  currency: string;
  createdAt: number;
};

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/order?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch(() => setError("Impossible de charger les details"))
      .finally(() => setLoading(false));
  }, [sessionId]);

  // Clear cart after successful purchase
  useEffect(() => {
    if (order) {
      localStorage.removeItem("cobblenite_cart");
    }
  }, [order]);

  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Link href="/" className="mb-8">
          <img
            src="/logo.webp"
            alt="Cobblenite"
            className="w-16 h-16 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]"
          />
        </Link>

        {loading ? (
          <div className="text-white/30 text-sm animate-pulse">Chargement...</div>
        ) : (
          <div className="w-full max-w-lg">
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Merci pour ton achat !</h1>
              {order && (
                <p className="text-white/40 text-sm">
                  Commande pour <span className="text-purple-400 font-medium">{order.playerName}</span>
                </p>
              )}
            </div>

            {/* Order details */}
            {order && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden mb-6">
                {/* Player header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                  <img
                    src={`https://mc-heads.net/avatar/${order.playerName}/32`}
                    alt={order.playerName}
                    className="w-8 h-8 rounded"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{order.playerName}</p>
                    <p className="text-white/20 text-xs">
                      {new Date(order.createdAt * 1000).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">{order.amountTotal.toFixed(2)}&euro;</p>
                  </div>
                </div>

                {/* Product list */}
                <div className="px-5 py-3 space-y-2">
                  {order.productIds.map((id, i) => {
                    const isUpsell = id.startsWith("upsell-");
                    return (
                      <div key={i} className="flex items-center gap-2 py-1.5">
                        <span
                          className={`text-[10px] ${isUpsell ? "text-purple-400" : "text-green-400"}`}
                        >
                          {isUpsell ? "+" : "\u25C6"}
                        </span>
                        <span className={`text-sm ${isUpsell ? "text-white/40" : "text-white/70"}`}>
                          {PRODUCT_NAMES[id] || id}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {error && !order && (
              <p className="text-white/30 text-sm text-center mb-6">{error}</p>
            )}

            {/* Delivery info */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 mb-6">
              <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Comment recuperer tes recompenses
              </h2>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-bold flex items-center justify-center mt-0.5">1</span>
                  <p className="text-white/50 text-sm">
                    <span className="text-white/70 font-medium">Connecte-toi</span> au serveur Minecraft <span className="text-purple-400">play.cobblenite.fr</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-bold flex items-center justify-center mt-0.5">2</span>
                  <p className="text-white/50 text-sm">
                    <span className="text-white/70 font-medium">Tes recompenses arrivent automatiquement</span> dans ton inventaire et ton PC Pokemon
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-bold flex items-center justify-center mt-0.5">3</span>
                  <p className="text-white/50 text-sm">
                    <span className="text-white/70 font-medium">Si tu es deja connecte</span>, la livraison est instantanee. Sinon elle sera livree a ta prochaine connexion.
                  </p>
                </div>
              </div>
            </div>

            {/* Ref */}
            {sessionId && (
              <p className="text-white/10 text-[10px] text-center mb-6">
                Ref: {sessionId.slice(0, 24)}...
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <Link
                href="/boutique"
                className="px-5 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Retour boutique
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Accueil
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050510]" />}>
      <SuccessContent />
    </Suspense>
  );
}
