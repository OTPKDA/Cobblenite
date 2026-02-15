"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Pack data ───
const PACKS = [
  {
    id: "starter",
    name: "Pack Starter",
    tagline: "Le premier pas de tout dresseur",
    price: "6.99€",
    color: "#4ade80",
    url: "https://cobblenite.tebex.io/package/7279105",
    sprite: "pikachu",
    items: [
      { icon: "🔴", text: "20 Poké Balls" },
      { icon: "🔵", text: "10 Great Balls" },
      { icon: "🧪", text: "10 Potions" },
      { icon: "💊", text: "5 Revives" },
      { icon: "💰", text: "5 000 PokéDollars" },
    ],
    gacha: "1 Clé Starter",
    jackpot: "Pikachu Shiny",
    jackpotSprite: "pikachu",
    vip: null,
    gachaPokemon: [
      { name: "Bulbizarre", sprite: "bulbasaur" },
      { name: "Salamèche", sprite: "charmander" },
      { name: "Carapuce", sprite: "squirtle" },
      { name: "Pikachu", sprite: "pikachu" },
      { name: "Eevee", sprite: "eevee" },
      { name: "Goupix", sprite: "vulpix" },
    ],
  },
  {
    id: "combat",
    name: "Pack Combat",
    tagline: "Pour les dresseurs ambitieux",
    price: "14.99€",
    color: "#ef4444",
    url: "https://cobblenite.tebex.io/package/7279112",
    sprite: "blastoise",
    items: [
      { icon: "⚡", text: "10 Ultra Balls" },
      { icon: "🧪", text: "10 Hyper Potions" },
      { icon: "🍬", text: "10 Rare Candy" },
      { icon: "💊", text: "3 Ability Capsules" },
      { icon: "💰", text: "15 000 PokéDollars" },
    ],
    gacha: "1 Clé Combat",
    jackpot: "Tortank Shiny",
    jackpotSprite: "blastoise",
    vip: "7j VIP",
    gachaPokemon: [
      { name: "Lucario", sprite: "lucario" },
      { name: "Garchomp", sprite: "garchomp" },
      { name: "Tortank", sprite: "blastoise" },
      { name: "Gardevoir", sprite: "gardevoir" },
      { name: "Dracolosse", sprite: "dragonite" },
      { name: "Braségali", sprite: "blaziken" },
    ],
  },
  {
    id: "shiny",
    name: "Pack Shiny",
    tagline: "La chasse aux chromatiques",
    price: "29.99€",
    color: "#22d3ee",
    url: "https://cobblenite.tebex.io/package/7279137",
    sprite: "charizard",
    shiny: true,
    items: [
      { icon: "⚡", text: "10 Ultra Balls" },
      { icon: "🍬", text: "10 Rare Candy" },
      { icon: "💊", text: "5 Ability Capsules" },
      { icon: "⬆️", text: "5 PP Up" },
      { icon: "💰", text: "30 000 PokéDollars" },
    ],
    gacha: "1 Clé Ultra + 1 Clé Shiny",
    jackpot: "Légendaire Shiny",
    jackpotSprite: "rayquaza",
    vip: "14j VIP",
    gachaPokemon: [
      { name: "Noctali", sprite: "umbreon" },
      { name: "Nymphali", sprite: "sylveon" },
      { name: "Ectoplasma", sprite: "gengar" },
      { name: "Léviator", sprite: "gyarados" },
      { name: "Amphinobi", sprite: "greninja" },
      { name: "Jungko", sprite: "sceptile" },
    ],
  },
  {
    id: "legendaire",
    name: "Pack Légendaire",
    tagline: "Le pouvoir des légendes",
    price: "49.99€",
    color: "#fbbf24",
    url: "https://cobblenite.tebex.io/package/7279147",
    sprite: "ho-oh",
    items: [
      { icon: "🟣", text: "1 Master Ball" },
      { icon: "🍬", text: "20 Rare Candy" },
      { icon: "⬆️", text: "5 PP Max" },
      { icon: "💊", text: "5 Ability Capsules" },
      { icon: "💰", text: "60 000 PokéDollars" },
    ],
    gacha: "1 Clé Master + 1 Clé Légende",
    jackpot: "Pokémon Légendaire",
    jackpotSprite: "mewtwo",
    vip: "21j VIP",
    gachaPokemon: [
      { name: "Mewtwo", sprite: "mewtwo" },
      { name: "Rayquaza", sprite: "rayquaza" },
      { name: "Lugia", sprite: "lugia" },
      { name: "Ho-Oh", sprite: "ho-oh" },
      { name: "Sulfura", sprite: "moltres" },
      { name: "Dracolosse", sprite: "dragonite" },
    ],
  },
  {
    id: "legendaire-shiny",
    name: "Pack Lég. Shiny",
    tagline: "L'ultime collection",
    price: "59.99€",
    color: "#f472b6",
    url: "https://cobblenite.tebex.io/package/7279151",
    sprite: "rayquaza",
    shiny: true,
    items: [
      { icon: "🟣", text: "2 Master Balls" },
      { icon: "🍬", text: "30 Rare Candy" },
      { icon: "⬆️", text: "10 PP Max" },
      { icon: "💊", text: "10 Ability Capsules" },
      { icon: "💰", text: "100 000 PokéDollars" },
    ],
    gacha: "3 Clés Master + 1 Clé Lég. Shiny",
    jackpot: "Moltres Shiny",
    jackpotSprite: "moltres",
    vip: "1 mois VIP",
    gachaPokemon: [
      { name: "Mewtwo", sprite: "mewtwo" },
      { name: "Rayquaza", sprite: "rayquaza" },
      { name: "Lugia", sprite: "lugia" },
      { name: "Ho-Oh", sprite: "ho-oh" },
      { name: "Sulfura", sprite: "moltres" },
      { name: "Drattak", sprite: "salamence" },
    ],
  },
  {
    id: "vip",
    name: "VIP",
    tagline: "Deviens un dresseur d'élite",
    price: "4.99€/mois",
    color: "#a78bfa",
    url: "https://cobblenite.tebex.io/package/7255215",
    sprite: "lucario",
    items: [
      { icon: "✨", text: "Shiny Boost (x2 chances)" },
      { icon: "💰", text: "x2 PokéDollars sur les dresseurs" },
      { icon: "🎁", text: "1 Clé VIP / jour" },
      { icon: "🏠", text: "3 Homes (au lieu de 1)" },
      { icon: "⚡", text: "Cooldowns réduits (/tpa, /rtp, /back)" },
      { icon: "💀", text: "/back après la mort" },
      { icon: "🛡️", text: "50 000 blocs de claims (x5)" },
      { icon: "🎆", text: "Particules cosmétiques" },
    ],
    gacha: "Préfixe [VIP] en chat",
    jackpot: null,
    jackpotSprite: null,
    vip: "Abonnement",
    gachaPokemon: [],
  },
];

// ─── Pokémon sprite helpers (AI-generated, all WebP) ───
const SPRITE = (name: string) => `/pokemon/${name}.webp`;

// Pool of Pokémon for the gacha reel (local sprite name, display name, rarity color)
const GACHA_POKEMON = [
  // Commons (green)
  { sprite: "pikachu", name: "Pikachu", color: "#4ade80" },
  { sprite: "eevee", name: "Eevee", color: "#4ade80" },
  { sprite: "charmander", name: "Salamèche", color: "#4ade80" },
  { sprite: "bulbasaur", name: "Bulbizarre", color: "#4ade80" },
  { sprite: "squirtle", name: "Carapuce", color: "#4ade80" },
  { sprite: "dratini", name: "Minidraco", color: "#4ade80" },
  { sprite: "shinx", name: "Lixy", color: "#4ade80" },
  { sprite: "vulpix", name: "Goupix", color: "#4ade80" },
  // Rares (blue)
  { sprite: "lucario", name: "Lucario", color: "#60a5fa" },
  { sprite: "gardevoir", name: "Gardevoir", color: "#60a5fa" },
  { sprite: "gengar", name: "Ectoplasma", color: "#60a5fa" },
  { sprite: "garchomp", name: "Carchacrok", color: "#60a5fa" },
  { sprite: "greninja", name: "Amphinobi", color: "#60a5fa" },
  { sprite: "blaziken", name: "Braségali", color: "#60a5fa" },
  { sprite: "dragonite", name: "Dracolosse", color: "#60a5fa" },
  { sprite: "umbreon", name: "Noctali", color: "#60a5fa" },
  // Épiques (purple)
  { sprite: "blastoise", name: "Tortank", color: "#a78bfa" },
  { sprite: "salamence", name: "Drattak", color: "#a78bfa" },
  { sprite: "gyarados", name: "Léviator", color: "#a78bfa" },
  { sprite: "zoroark", name: "Zoroark", color: "#a78bfa" },
  { sprite: "sylveon", name: "Nymphali", color: "#a78bfa" },
  { sprite: "sceptile", name: "Jungko", color: "#a78bfa" },
  // Légendaires (gold)
  { sprite: "mewtwo", name: "Mewtwo", color: "#fbbf24" },
  { sprite: "rayquaza", name: "Rayquaza", color: "#fbbf24" },
  { sprite: "lugia", name: "Lugia", color: "#fbbf24" },
  { sprite: "ho-oh", name: "Ho-Oh", color: "#fbbf24" },
  { sprite: "moltres", name: "Sulfura", color: "#fbbf24" },
];

function GachaReel() {
  const [caughtIdx, setCaughtIdx] = useState<number | null>(null);
  const [showCatch, setShowCatch] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);

  // Every 4-7s, "catch" a random Pokémon
  useEffect(() => {
    const doCatch = () => {
      // Pick a random visible Pokémon
      const idx = Math.floor(Math.random() * GACHA_POKEMON.length);
      setCaughtIdx(idx);
      setShowCatch(true);

      // Reset after animation
      setTimeout(() => {
        setShowCatch(false);
        setCaughtIdx(null);
      }, 2500);
    };

    const interval = setInterval(doCatch, 5000);
    // First catch after 3s
    const firstTimeout = setTimeout(doCatch, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  // Build a shuffled reel with duplicates for seamless loop
  const reelPokemon = [...GACHA_POKEMON, ...GACHA_POKEMON];

  return (
    <div className="relative mb-14 overflow-hidden">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-white/10" />
        <span className="text-white/30 text-xs uppercase tracking-[0.2em] font-medium">Récompenses</span>
        <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-8 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050510] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-8 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050510] to-transparent pointer-events-none" />

      {/* Reel */}
      <div
        ref={reelRef}
        className="flex gap-4 items-end"
        style={{
          animation: 'gacha-scroll 25s linear infinite',
          width: 'max-content',
        }}
      >
        {reelPokemon.map((poke, i) => {
          const isCaught = showCatch && caughtIdx !== null && (i % GACHA_POKEMON.length) === caughtIdx;
          return (
            <div
              key={`${poke.sprite}-${i}`}
              className="relative flex flex-col items-center transition-all duration-500"
              style={{
                opacity: isCaught ? 1 : 0.5,
                transform: isCaught ? 'scale(1.15) translateY(-8px)' : 'scale(1)',
                filter: isCaught ? `drop-shadow(0 0 20px ${poke.color})` : 'none',
              }}
            >
              {/* Catch flash */}
              {isCaught && (
                <>
                  <div
                    className="absolute inset-0 rounded-full blur-[30px] pointer-events-none animate-pulse"
                    style={{ background: `${poke.color}30` }}
                  />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border whitespace-nowrap"
                      style={{
                        color: poke.color,
                        borderColor: `${poke.color}50`,
                        background: `${poke.color}20`,
                        animation: 'gacha-catch-badge 0.5s ease-out',
                      }}
                    >
                      Capturé !
                    </span>
                  </div>
                </>
              )}
              <img
                src={SPRITE(poke.sprite)}
                alt={poke.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain pointer-events-none select-none"
                loading="lazy"
                draggable={false}
              />
              <span className="text-[10px] mt-1 font-medium whitespace-nowrap transition-colors duration-300"
                style={{ color: isCaught ? poke.color : 'rgba(255,255,255,0.25)' }}>
                {poke.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ParallaxImage({ src, alt, className, speed = 0.15 }: { src: string; alt: string; className: string; speed?: number }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewCenter = window.innerHeight / 2;
            const offset = (center - viewCenter) * speed;
            ref.current.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return <img ref={ref} src={src} alt={alt} className={`will-change-transform ${className}`} />;
}

const SERVER_IP = "play.cobblenite.fr";
const TEBEX_URL = "https://cobblenite.tebex.io";
const DISCORD_SERVER_ID = "1423492671351296092";

function ServerStatus() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await res.json();
        setOnline(data.online);
      } catch {
        setOnline(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/40">
        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
        <span>Vérification...</span>
      </div>
    );
  }

  if (!online) {
    return (
      <div className="flex items-center gap-2 text-red-400/80">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span>Serveur hors ligne</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-400/80">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span>Serveur en ligne</span>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-3 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border border-white/20"
    >
      {copied ? "Copié !" : "Copier"}
    </button>
  );
}

const LAUNCHER_URL = "http://79.137.34.10/cobblenite/Cobblenite-Launcher-setup-1.0.0.exe";
const CURSEFORGE_URL = "https://www.curseforge.com/minecraft/modpacks/cobblenite";

const NAV_ITEMS = [
  { id: "hero", label: "Cobblenite", href: "#" },
  { id: "presentation", label: "Le serveur", href: "#presentation" },
  { id: "wiki", label: "Wiki", href: "#wiki" },
  { id: "rejoindre", label: "Rejoindre", href: "#rejoindre" },
  { id: "boutique", label: "Boutique", href: "#boutique" },
  { id: "discord", label: "Discord", href: "#discord" },
];

// Only the 5 purchasable packs for the carousel (no VIP)
const SHOP_PACKS = PACKS.filter(p => p.id !== "vip");
const VIP_PACK = PACKS.find(p => p.id === "vip")!;

function PackCard({ pack, onOpenDetail }: { pack: typeof PACKS[0]; onOpenDetail: () => void }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-lg transition-all duration-300 group p-5 cursor-pointer"
      style={{
        borderColor: `${pack.color}25`,
        background: `linear-gradient(160deg, ${pack.color}0a 0%, transparent 60%)`,
        minWidth: 270,
        width: 290,
        flexShrink: 0,
      }}
      onClick={onOpenDetail}
    >
      {/* Glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-60" style={{ background: `${pack.color}15` }} />

      <div className="relative z-10">
        {/* Header row: badge + VIP */}
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
            style={{ color: pack.color, borderColor: `${pack.color}35`, background: `${pack.color}12` }}>
            Pack
          </span>
          {pack.vip && (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-200 text-[10px] font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              +{pack.vip}
            </span>
          )}
        </div>

        {/* Pokémon sprite - big and centered */}
        <div className="flex justify-center my-4 relative">
          {/* Shiny shimmer overlay */}
          {"shiny" in pack && pack.shiny && (
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
              <div className="w-20 h-20 rounded-full shiny-shimmer" style={{ background: `conic-gradient(from 0deg, transparent, ${pack.color}40, transparent, ${pack.color}20, transparent)` }} />
            </div>
          )}
          <img
            src={SPRITE(pack.sprite)}
            alt={pack.name}
            className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-500 pointer-events-none select-none"
            style={{ filter: `drop-shadow(0 0 16px ${pack.color}50)` }}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Name + price row */}
        <h3 className="text-lg font-bold text-white text-center">{pack.name}</h3>
        <p className="text-center mb-3">
          <span className="text-xl font-bold" style={{ color: pack.color }}>{pack.price}</span>
        </p>

        {/* PokéDollars highlight */}
        {(() => {
          const pdItem = pack.items.find(i => i.text.includes("PokéDollars"));
          return pdItem ? (
            <div className="text-center mb-3 py-2.5 rounded-xl border" style={{ borderColor: "rgba(251,191,36,0.25)", background: "rgba(251,191,36,0.08)" }}>
              <span className="text-lg font-bold text-yellow-400">💰 {pdItem.text}</span>
            </div>
          ) : null;
        })()}

        {/* Gacha + Jackpot */}
        <div className="rounded-xl p-2.5 mb-2 border" style={{ borderColor: `${pack.color}15`, background: `${pack.color}08` }}>
          <div className="flex items-center gap-1.5 text-[11px] text-white/70 mb-1 font-semibold">
            <span>🎰</span> {pack.gacha}
          </div>
          {pack.jackpot && (
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: pack.color }}>
              <span>✨</span> Jackpot : <strong className="text-white">{pack.jackpot}</strong>
            </div>
          )}
        </div>

        {/* Other items count */}
        {(() => {
          const otherCount = pack.items.filter(i => !i.text.includes("PokéDollars")).length;
          return otherCount > 0 ? (
            <p className="text-center text-white/30 text-[11px] mb-3">+ {otherCount} objets inclus</p>
          ) : null;
        })()}

        {/* Mini pokemon preview */}
        {pack.gachaPokemon.length > 0 && (
          <div className="flex items-center justify-center gap-1 mb-3">
            {pack.gachaPokemon.slice(0, 4).map((p, i) => (
              <img key={i} src={SPRITE(p.sprite)} alt={p.name} className="w-8 h-8 object-contain opacity-50 group-hover:opacity-80 transition-opacity" loading="lazy" draggable={false} />
            ))}
            <span className="text-white/25 text-[10px] ml-1">+{pack.gachaPokemon.length - 4 > 0 ? pack.gachaPokemon.length - 4 : '...'}</span>
          </div>
        )}

        {/* CTA */}
        <button
          className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer"
          style={{ color: "white", borderColor: `${pack.color}35`, background: `${pack.color}18` }}
          onClick={(e) => { e.stopPropagation(); onOpenDetail(); }}
        >
          Voir le contenu
        </button>
      </div>
    </div>
  );
}

// ─── Pack Detail Modal ───
function PackModal({ pack, onClose }: { pack: typeof PACKS[0]; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl border p-6 md:p-8"
        style={{
          borderColor: `${pack.color}30`,
          background: `linear-gradient(160deg, #0a0a1a 0%, #050510 100%)`,
          boxShadow: `0 30px 100px -20px ${pack.color}20`,
          animation: 'modal-in 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors cursor-pointer">
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
        </button>

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] pointer-events-none" style={{ background: `${pack.color}15` }} />

        <div className="relative z-10">
          {/* Header: sprite + name + price */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative shrink-0">
              {"shiny" in pack && pack.shiny && (
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full shiny-shimmer" style={{ background: `conic-gradient(from 0deg, transparent, ${pack.color}40, transparent, ${pack.color}20, transparent)` }} />
                </div>
              )}
              <img
                src={SPRITE(pack.sprite)}
                alt={pack.name}
                className="w-24 h-24 object-contain"
                style={{ filter: `drop-shadow(0 0 20px ${pack.color}50)` }}
                draggable={false}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white">{pack.name}</h3>
                {pack.vip && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-200 text-[10px] font-bold">
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    +{pack.vip}
                  </span>
                )}
              </div>
              <p className="text-white/40 text-sm mb-2">{pack.tagline}</p>
              <p className="text-2xl font-bold" style={{ color: pack.color }}>{pack.price}</p>
            </div>
          </div>

          {/* Items section */}
          <div className="mb-6">
            <h4 className="text-white/50 text-xs uppercase tracking-wider mb-3 font-medium">Contenu du pack</h4>
            <div className="grid grid-cols-2 gap-2">
              {pack.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/5 bg-white/[0.02]">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-white/70 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards section */}
          <div className="mb-6 rounded-2xl p-4 border" style={{ borderColor: `${pack.color}20`, background: `${pack.color}06` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎰</span>
              <div>
                <p className="text-white text-sm font-semibold">{pack.gacha}</p>
                {pack.jackpot && (
                  <p className="text-xs" style={{ color: pack.color }}>Jackpot : {pack.jackpot} ✨</p>
                )}
              </div>
            </div>

            {/* Pokémon grid */}
            {pack.gachaPokemon.length > 0 && (
              <>
                <h4 className="text-white/40 text-[10px] uppercase tracking-wider mb-2 font-medium">Pokémon obtenables</h4>
                <div className="grid grid-cols-3 gap-2">
                  {pack.gachaPokemon.map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                      <img
                        src={SPRITE(p.sprite)}
                        alt={p.name}
                        className="w-14 h-14 object-contain"
                        style={{ filter: `drop-shadow(0 0 8px ${pack.color}30)` }}
                        loading="lazy"
                        draggable={false}
                      />
                      <span className="text-white/60 text-[10px] font-medium text-center">{p.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/20 text-[10px] mt-2 text-center">Et bien d&apos;autres...</p>
              </>
            )}
          </div>

          {/* CTA */}
          <a
            href={pack.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3.5 rounded-full font-semibold transition-all duration-300 border text-white"
            style={{
              borderColor: `${pack.color}40`,
              background: `${pack.color}25`,
              boxShadow: `0 8px 30px -8px ${pack.color}30`,
            }}
          >
            Acheter — {pack.price}
          </a>
        </div>
      </div>
    </div>
  );
}

function BoutiqueSection() {
  const [paused, setPaused] = useState(false);
  const [selectedPack, setSelectedPack] = useState<typeof PACKS[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="boutique" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium text-center">Shop</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Boutique</h2>
        <p className="text-white/40 mb-12 text-center">Packs exclusifs, clés et avantages VIP</p>

        {/* ── Rewards Reel ── */}
        <GachaReel />

        {/* ── Infinite scrolling carousel ── */}
        <div
          className="relative overflow-hidden mb-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#050510] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#050510] to-transparent pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-6"
            style={{
              animation: `marquee-scroll 35s linear infinite`,
              animationPlayState: paused ? 'paused' : 'running',
              width: 'max-content',
            }}
          >
            {[...SHOP_PACKS, ...SHOP_PACKS].map((pack, i) => (
              <PackCard key={`${pack.id}-${i}`} pack={pack} onOpenDetail={() => setSelectedPack(pack)} />
            ))}
          </div>
        </div>

        {/* ── VIP Card (always visible) ── */}
        <div className="max-w-2xl mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl border backdrop-blur-xl p-8 md:p-10 shadow-2xl"
            style={{
              borderColor: `${VIP_PACK.color}30`,
              background: `linear-gradient(135deg, ${VIP_PACK.color}08 0%, ${VIP_PACK.color}03 50%, transparent 100%)`,
              boxShadow: `0 25px 80px -20px ${VIP_PACK.color}12, 0 0 60px ${VIP_PACK.color}06`,
            }}
          >
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: `${VIP_PACK.color}18` }} />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
              {/* Left: Lucario + info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={SPRITE(VIP_PACK.sprite)}
                    alt="VIP"
                    className="w-20 h-20 object-contain"
                    style={{ filter: `drop-shadow(0 0 20px ${VIP_PACK.color}40)` }}
                    draggable={false}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">Grade VIP</h3>
                      <span className="px-2 py-0.5 bg-yellow-500/15 border border-yellow-500/30 rounded text-yellow-300 text-[10px] font-bold uppercase">Premium</span>
                    </div>
                    <p className="text-white/40 text-sm">Deviens un dresseur d&apos;élite</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {VIP_PACK.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 bg-white/[0.02]">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-white/60 text-sm">{item.text}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-purple-500/20 bg-purple-500/5">
                    <span className="text-base">💬</span>
                    <span className="text-purple-300 text-sm">{VIP_PACK.gacha}</span>
                  </div>
                </div>
              </div>

              {/* Right: price + CTA */}
              <div className="flex flex-col items-center md:w-48 shrink-0">
                <p className="text-3xl md:text-4xl font-bold text-white mb-0.5">4.99&euro;<span className="text-white/40 text-base font-normal">/mois</span></p>
                <p className="text-white/25 text-xs mb-5">Renouvellement auto</p>
                <a
                  href={VIP_PACK.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-6 py-3.5 rounded-full font-semibold transition-all duration-300 border block text-white"
                  style={{ borderColor: `${VIP_PACK.color}40`, background: `${VIP_PACK.color}20` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${VIP_PACK.color}35`;
                    e.currentTarget.style.boxShadow = `0 10px 40px -10px ${VIP_PACK.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${VIP_PACK.color}20`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  S&apos;abonner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pack detail modal */}
      {selectedPack && <PackModal pack={selectedPack} onClose={() => setSelectedPack(null)} />}

      {/* CSS animations */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gacha-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gacha-catch-badge {
          0% { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.7); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes boutique-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5) translateY(0); }
          50% { opacity: 0.5; transform: scale(1.5) translateY(-8px); }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shiny-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .shiny-shimmer {
          animation: shiny-rotate 4s linear infinite;
          opacity: 0.4;
        }
      `}</style>
    </section>
  );
}

export default function Home() {
  const [active, setActive] = useState("hero");
  const [bubble, setBubble] = useState({ left: 0, width: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const updateBubble = useCallback((id: string) => {
    const el = itemRefs.current[id];
    const nav = navRef.current;
    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setBubble({ left: elRect.left - navRect.left, width: elRect.width });
    }
  }, []);

  useEffect(() => {
    updateBubble(active);
  }, [active, updateBubble]);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (atBottom) {
        setActive("discord");
        return;
      }
      const sections = ["discord", "boutique", "rejoindre", "wiki", "presentation"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id);
          return;
        }
      }
      setActive("hero");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050510]">
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Logo top left - hidden on mobile */}
      <a href="#" className="fixed top-4 left-4 md:left-12 z-50 hidden md:block">
        <img src="/logo.webp" alt="Cobblenite" className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
      </a>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 right-4 z-50 md:hidden p-3 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        aria-label="Menu"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors duration-300 ${
                    active === item.id
                      ? "text-white bg-white/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div ref={navRef} className="relative flex items-center gap-0.5 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]">
          {/* Sliding bubble */}
          <div
            className="absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-white/20 border border-white/15 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ left: bubble.left, width: bubble.width }}
          />
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              ref={(el) => { itemRefs.current[item.id] = el; }}
              href={item.href}
              className={`relative z-10 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-full transition-colors duration-300 whitespace-nowrap ${
                active === item.id
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.webp" alt="" className="w-full h-full object-cover object-[25%_center]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/60 via-[#050510]/40 to-[#050510]" />
        </div>
        <p className="relative z-10 text-sm uppercase tracking-[0.3em] text-white mb-6 font-medium">Minecraft Cobblemon</p>
        <img src="/logo-text.webp" alt="Cobblenite" className="relative z-10 w-[400px] md:w-[600px] mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
        <p className="relative z-10 text-lg md:text-xl text-white/90 max-w-md mb-10 leading-relaxed">
          Capture, entraîne et combats des Pokémon dans un monde ouvert avec tes amis.
        </p>
        <a
          href="#rejoindre"
          className="relative z-10 group px-8 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full font-semibold text-base transition-all duration-300 border border-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-purple-500/10"
        >
          Rejoindre le serveur
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </section>

      {/* Présentation */}
      <section id="presentation" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">À propos</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Le serveur</h2>
          <p className="text-lg text-white/40 leading-relaxed">
            Cobblenite est un serveur Minecraft Cobblemon où tu peux capturer,
            entraîner et combattre des Pokémon dans un monde ouvert avec tes amis.
            Explore le monde, complète ton Pokédex, et deviens le meilleur dresseur.
          </p>
        </div>
      </section>

      {/* Wiki */}
      <section id="wiki" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">Guide</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Wiki Cobblenite</h2>

          {/* Liquid Glass Wiki Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 group-hover:opacity-80" />
              {/* Glass container */}
              <div className="relative w-24 h-24 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:border-white/30 group-hover:bg-white/15 transition-all duration-500">
                {/* Inner highlight */}
                <div className="absolute inset-[2px] rounded-[22px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                {/* Wiki book icon */}
                <svg className="w-12 h-12 text-white/80 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-lg text-white/40 leading-relaxed mb-10">
            Tu débutes sur Cobblenite ? Consulte notre Wiki pour tout savoir sur le serveur : commandes, fonctionnalités, astuces et bien plus encore !
          </p>
          <a
            href="https://cobblenite.gitbook.io/wiki-cobblenite/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white rounded-full font-semibold text-base transition-all duration-300 border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/10"
          >
            Accéder au Wiki
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Dracaufeu - entre Serveur et Rejoindre */}
      <div className="relative h-0 max-w-7xl mx-auto">
        <ParallaxImage src="/dracau.webp" alt="Dracaufeu" speed={0.2} className="absolute -right-[300px] md:-right-[500px] top-1/2 w-[600px] md:w-[1200px] pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]" />
      </div>

      {/* Rejoindre */}
      <section id="rejoindre" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">Connexion</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Rejoindre</h2>
          <p className="text-white/40 mb-4">Copie l&apos;IP et rejoins-nous en jeu</p>
          <div className="flex justify-center mb-6">
            <ServerStatus />
          </div>
          <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-5 shadow-lg shadow-black/20 mb-12">
            <code className="text-2xl font-mono bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">{SERVER_IP}</code>
            <CopyButton text={SERVER_IP} />
          </div>

          {/* Download section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Installer les mods</h3>
            <p className="text-white/35 text-sm mb-6">Choisis ta méthode pour installer le modpack Cobblenite</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CURSEFORGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-[#F16436]/15 hover:bg-[#F16436]/25 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 border border-[#F16436]/30 hover:border-[#F16436]/50 hover:shadow-lg hover:shadow-[#F16436]/15"
              >
                <svg className="w-5 h-5 text-[#F16436]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.326 9.2h1.294l.863-1.2H5.394l-.408 1.2h7.39c.975 0 2.39.564 3.16 1.489h-5.49l-.862 1.2h7.013c.261.594.375 1.24.375 1.906 0 2.56-1.89 4.605-4.42 4.605H8.59l-.863 1.2h4.453c3.615 0 6.55-2.985 6.55-6.605 0-.715-.123-1.433-.404-2.595z"/></svg>
                CurseForge
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href={LAUNCHER_URL}
                className="group flex items-center gap-3 px-6 py-3.5 bg-purple-500/15 hover:bg-purple-500/25 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/15"
              >
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Launcher (.exe)
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pikachu - entre Rejoindre et VIP */}
      <div className="relative h-0 max-w-7xl mx-auto">
        <ParallaxImage src="/pika.webp" alt="Pikachu" speed={-0.15} className="absolute -left-[300px] md:-left-[500px] top-1/2 w-[600px] md:w-[1200px] pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]" />
      </div>

      {/* Boutique */}
      <BoutiqueSection />

      {/* Pokemon 3 - avant Discord */}
      <div className="relative h-0 max-w-7xl mx-auto">
        <img src="/pokemon3.webp" alt="" className="absolute -right-[300px] md:-right-[500px] top-1/2 -translate-y-1/2 w-96 md:w-[700px] pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]" />
      </div>

      {/* Discord */}
      <section id="discord" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">Communauté</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Discord</h2>
          <div className="flex flex-col items-center gap-8">
            <svg className="w-24 h-24 text-[#5865F2] drop-shadow-[0_0_30px_rgba(88,101,242,0.4)]" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
            <p className="text-white/40 text-lg max-w-md">
              Rejoins notre communauté Discord pour discuter, trouver des partenaires de combat et rester informé des événements !
            </p>
            <a
              href="https://discord.gg/AnhXRh2uKv"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-3.5 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 backdrop-blur-md text-white rounded-full font-semibold text-base transition-all duration-300 border border-[#5865F2]/30 hover:border-[#5865F2]/50 hover:shadow-lg hover:shadow-[#5865F2]/20"
            >
              Rejoindre la communauté
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-10 px-6 text-center text-sm text-white/20">
        &copy; {new Date().getFullYear()} Cobblenite. Tous droits réservés.
        <br />
        <span className="text-white/10 text-xs">
          Serveur Minecraft non officiel. Non affilié à Pokémon, Nintendo, Mojang ou Cobblemon.
        </span>
      </footer>
    </main>
  );
}
