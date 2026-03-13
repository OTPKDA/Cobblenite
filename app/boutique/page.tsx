"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Sprite helper ───
const SPRITE = (name: string) => `/pokemon/${name}.webp`;

// ─── Catalogue ───

type Product = {
  id: string;
  name: string;
  price: number; // euros
  color: string;
  sprite?: string;
  customImage?: string;
  tagline?: string;
  items: string[];
  vip?: string;
  badge?: string;
  oldPrice?: number;
  category: "pack" | "cobbledollars" | "gacha";
  discount?: string;
};

const PACKS: Product[] = [
  {
    id: "vip-trainer",
    name: "Pass Dresseur",
    tagline: "Deviens un dresseur reconnu",
    price: 4.99,
    color: "#a78bfa",
    customImage: "/vip-pass.webp",
    badge: "VIP",
    category: "pack",
    items: [
      "Grade VIP permanent",
      "Prefixe [VIP] en chat",
      "Shiny Boost x2",
      "x2 PokeDollars sur dresseurs",
      "Boost XP x2 (30 jours)",
      "1 Cle VIP / jour",
      "3 Homes",
      "Cooldowns reduits (/tpa, /rtp)",
      "/back apres la mort",
      "5 000 Claim Blocks",
      "Particules cosmetiques",
      "5 000 CobbleDollars",
      "1 Jeton Gacha",
      "1 Cle VIP gratuite",
    ],
    vip: "Permanent",
  },
  {
    id: "vip-plus",
    name: "Pass Dresseur+",
    tagline: "L'elite des dresseurs",
    price: 12.99,
    color: "#fbbf24",
    customImage: "/vip-plus.webp",
    badge: "VIP+",
    category: "pack",
    items: [
      "Grade VIP+ permanent",
      "Prefixe [VIP+] dore en chat",
      "Shiny Boost x3",
      "x3 PokeDollars sur dresseurs",
      "Boost XP x4 (30 jours)",
      "2 Cles VIP / jour",
      "5 Homes",
      "Cooldowns encore plus reduits",
      "/back apres la mort",
      "10 000 Claim Blocks",
      "Particules exclusives VIP+",
      "/fly dans le lobby",
      "/craft partout",
      "/pokeheal pour soigner ses Pokemon",
      "/pc accessible partout",
      "+30 PC Boxes",
      "25 000 CobbleDollars",
      "3 Jetons Gacha",
    ],
    vip: "Permanent",
  },
  {
    id: "pack-starter",
    name: "Kit du Dresseur",
    tagline: "Tout pour bien lancer ton aventure",
    price: 6.99,
    color: "#4ade80",
    customImage: "/kit-dresseur.webp",
    category: "pack",
    items: [
      "1 Pokemon aleatoire (pool ci-dessous)",
      "5 000 CobbleDollars",
      "20 Pokeballs + 5 Super Balls + 2 Hyper Balls",
      "5 Rare Candy",
      "3 Jetons Gacha",
    ],
    vip: "7 jours",
  },
  {
    id: "pack-combat",
    name: "Pack Arene",
    tagline: "Prepare-toi au combat",
    price: 12.99,
    oldPrice: 14.99,
    color: "#ef4444",
    sprite: "blaziken",
    customImage: "/pack-arena.webp",
    category: "pack",
    items: [
      "15 000 CobbleDollars",
      "1x Combat Crate",
      "1x Starter Crate",
      "5 Jetons Gacha",
    ],
    vip: "7 jours",
  },
  {
    id: "pack-shiny",
    name: "Etoile Chromee",
    tagline: "La chasse aux chromatiques",
    price: 24.99,
    oldPrice: 29.99,
    color: "#22d3ee",
    customImage: "/etoile-chromee.webp",
    sprite: "umbreon",
    badge: "Populaire",
    category: "pack",
    items: [
      "30 000 CobbleDollars",
      "1x Ultra Crate",
      "1x Shiny Crate",
      "1x Combat Crate",
      "10 Jetons Gacha",
    ],
    vip: "14 jours",
  },
  {
    id: "pack-legendaire",
    name: "Coffre du Champion",
    tagline: "Le pouvoir des legendes",
    price: 39.99,
    oldPrice: 49.99,
    color: "#fbbf24",
    customImage: "/coffre-champion.webp",
    sprite: "mewtwo",
    category: "pack",
    items: [
      "60 000 CobbleDollars",
      "1x Master Crate",
      "1x Legend Crate",
      "1x Shiny Crate",
      "20 Jetons Gacha",
    ],
    vip: "21 jours",
  },
  {
    id: "pack-legendaire-shiny",
    name: "Relique Ancestrale",
    tagline: "L'ultime tresor",
    price: 49.99,
    oldPrice: 59.99,
    color: "#f472b6",
    customImage: "/relique-ancestrale.webp",
    sprite: "rayquaza",
    badge: "Ultime",
    category: "pack",
    items: [
      "100 000 CobbleDollars",
      "1x Legend Shiny Crate",
      "3x Master Crate",
      "1x Legend Crate",
      "35 Jetons Gacha",
    ],
    vip: "30 jours",
  },
];

const COBBLEDOLLARS: Product[] = [
  { id: "cd-5000", name: "5 000", price: 1.99, color: "#fbbf24", category: "cobbledollars", items: ["5 000 CobbleDollars"] },
  { id: "cd-15000", name: "15 000", price: 4.99, color: "#fbbf24", category: "cobbledollars", items: ["15 000 CobbleDollars"], discount: "-17%" },
  { id: "cd-50000", name: "50 000", price: 12.99, color: "#fbbf24", category: "cobbledollars", items: ["50 000 CobbleDollars"], discount: "-35%" },
  { id: "cd-100000", name: "100 000", price: 19.99, color: "#fbbf24", category: "cobbledollars", items: ["100 000 CobbleDollars"], discount: "-50%", badge: "Best seller" },
  { id: "cd-250000", name: "250 000", price: 39.99, color: "#fbbf24", category: "cobbledollars", items: ["250 000 CobbleDollars"], discount: "-60%" },
  { id: "cd-500000", name: "500 000", price: 69.99, color: "#fbbf24", category: "cobbledollars", items: ["500 000 CobbleDollars"], discount: "-65%", badge: "Meilleure offre" },
];

const GACHA_TOKENS: Product[] = [
  { id: "gacha-1", name: "1 Jeton", price: 1.99, color: "#c084fc", category: "gacha", items: ["1 Jeton Gacha"] },
  { id: "gacha-5", name: "5 Jetons", price: 7.99, color: "#c084fc", category: "gacha", items: ["5 Jetons Gacha"], discount: "-20%" },
  { id: "gacha-10", name: "10 Jetons", price: 14.99, color: "#c084fc", category: "gacha", items: ["10 Jetons Gacha"], discount: "-25%", badge: "Populaire" },
  { id: "gacha-25", name: "25 Jetons", price: 29.99, color: "#c084fc", category: "gacha", items: ["25 Jetons Gacha"], discount: "-40%" },
  { id: "gacha-50", name: "50 Jetons", price: 49.99, color: "#c084fc", category: "gacha", items: ["50 Jetons Gacha"], discount: "-50%", badge: "Meilleure offre" },
];

type Upsell = {
  id: string;
  name: string;
  price: number;
  realPrice: number;
  description: string;
  dynamicPrice?: boolean;
};

// Prix dynamique "Choisis ton Pokemon" par pack
const CHOOSE_POKEMON_PRICES: Record<string, number> = {
  "pack-starter": 1.00,
  "pack-combat": 2.00,
  "pack-shiny": 3.00,
  "pack-legendaire": 5.00,
  "pack-legendaire-shiny": 5.00,
};

const UPSELLS: Upsell[] = [
  { id: "upsell-double-cd", name: "Double CobbleDollars", price: 1.49, realPrice: 1.99, description: "x2 les CobbleDollars du pack" },
  { id: "upsell-ev-max", name: "EV Training Max", price: 1.49, realPrice: 4.99, description: "Ton Pokemon arrive avec les EVs optimises" },
  { id: "upsell-iv", name: "IV Parfaits", price: 1.99, realPrice: 5.99, description: "Un Pokemon du pack passe 6IV" },
  { id: "upsell-vip-extend", name: "VIP Etendu", price: 2.49, realPrice: 4.99, description: "Double la duree VIP du pack" },
  { id: "upsell-shiny", name: "Shiny Boost", price: 2.99, realPrice: 9.99, description: "Un Pokemon du pack devient shiny" },
  { id: "upsell-gacha5", name: "+5 Jetons Gacha", price: 3.99, realPrice: 7.99, description: "5 jetons gacha bonus" },
  { id: "upsell-choose-pokemon", name: "Choisis ton Pokemon", price: 1.00, realPrice: 9.99, description: "Choisis exactement le Pokemon que tu veux", dynamicPrice: true },
];

// ─── Grade thresholds for upsell ───
const GRADE_THRESHOLDS = [
  { threshold: 10, grade: "Rival", color: "#4ade80" },
  { threshold: 25, grade: "Challenger", color: "#60a5fa" },
  { threshold: 50, grade: "Champion", color: "#fbbf24" },
  { threshold: 100, grade: "Maitre", color: "#ef4444" },
  { threshold: 200, grade: "Legende", color: "#a78bfa" },
  { threshold: 500, grade: "Mythique", color: "#22d3ee" },
  { threshold: 1000, grade: "Divin", color: "#f472b6" },
];

// ─── Components ───

function PackCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_VISIBLE = 5;
  const hasMore = product.items.length > MAX_VISIBLE;
  const visibleItems = expanded ? product.items : product.items.slice(0, MAX_VISIBLE);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-lg transition-all duration-300 group p-5 flex flex-col"
      style={{
        borderColor: `${product.color}25`,
        background: `linear-gradient(160deg, ${product.color}0a 0%, transparent 60%)`,
      }}
    >
      {/* Glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-60"
        style={{ background: `${product.color}15` }}
      />

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
            style={{ color: product.color, borderColor: `${product.color}40`, background: `${product.color}15` }}
          >
            {product.badge}
          </span>
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* VIP badge */}
        {product.vip && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-200 text-[10px] font-bold">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              VIP {product.vip}
            </span>
          </div>
        )}

        {/* Image */}
        {(product.customImage || product.sprite) && (
          <div className="flex justify-center my-3">
            <img
              src={product.customImage || SPRITE(product.sprite!)}
              alt={product.name}
              className={`object-contain group-hover:scale-110 transition-transform duration-500 pointer-events-none select-none ${product.customImage ? "w-full h-32 rounded-xl" : "w-24 h-24"}`}
              style={{ filter: `drop-shadow(0 0 16px ${product.color}50)` }}
              loading="lazy"
              draggable={false}
            />
          </div>
        )}

        {/* Name */}
        <h3 className="text-lg font-bold text-white text-center">{product.name}</h3>
        {product.tagline && (
          <p className="text-white/30 text-xs text-center mb-2">{product.tagline}</p>
        )}

        {/* Price */}
        <div className="text-center mb-3">
          {product.oldPrice && (
            <span className="text-white/30 text-sm line-through mr-2">{product.oldPrice.toFixed(2)}&euro;</span>
          )}
          <span className="text-xl font-bold" style={{ color: product.color }}>
            {product.price.toFixed(2)}&euro;
          </span>
        </div>

        {/* Items */}
        <div className="space-y-1.5 mb-4 flex-1">
          {visibleItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-sm text-white/60"
            >
              <span className="text-[10px]" style={{ color: product.color }}>&#9670;</span>
              {item}
            </div>
          ))}
          {hasMore && !expanded && (
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
              className="w-full text-center py-1.5 text-xs font-medium cursor-pointer transition-colors"
              style={{ color: product.color }}
            >
              + {product.items.length - MAX_VISIBLE} avantages de plus...
            </button>
          )}
          {hasMore && expanded && (
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
              className="w-full text-center py-1.5 text-xs font-medium cursor-pointer transition-colors text-white/30"
            >
              Reduire
            </button>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={onAdd}
          className="w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer hover:scale-[1.02]"
          style={{
            color: "white",
            borderColor: `${product.color}40`,
            background: `${product.color}20`,
          }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

function CurrencyCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const isCd = product.category === "cobbledollars";
  const icon = isCd ? "\uD83E\uDE99" : "\uD83C\uDFB0";

  return (
    <div
      className="relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-300 group p-4 flex flex-col"
      style={{
        borderColor: `${product.color}20`,
        background: `linear-gradient(160deg, ${product.color}08 0%, transparent 60%)`,
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border"
            style={{ color: product.color, borderColor: `${product.color}40`, background: `${product.color}15` }}
          >
            {product.badge}
          </span>
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* Icon + Amount */}
        <div className="text-center mb-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-bold text-white mt-1">{product.name}</h3>
        </div>

        {/* Discount */}
        {product.discount && (
          <div className="text-center mb-2">
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ color: product.color, background: `${product.color}15` }}
            >
              {product.discount}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="text-center mb-3 flex-1">
          <span className="text-xl font-bold" style={{ color: product.color }}>
            {product.price.toFixed(2)}&euro;
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={onAdd}
          className="w-full text-center px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer hover:scale-[1.02]"
          style={{
            color: "white",
            borderColor: `${product.color}30`,
            background: `${product.color}15`,
          }}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

type CartItem = {
  product: Product | Upsell;
  type: "product" | "upsell";
};

// Packs that should NOT show upsells (no Pokemon, no VIP duration to extend, etc.)
const NO_UPSELL_PACKS = new Set(["vip-trainer", "vip-plus"]);

// Upsells that only make sense for packs with CobbleDollars
const CD_UPSELL = "upsell-double-cd";
// Upsells that only make sense for packs with VIP duration
const VIP_UPSELL = "upsell-vip-extend";
// Upsells that require a Pokemon in the pack
const POKEMON_UPSELLS = new Set(["upsell-ev-max", "upsell-iv", "upsell-shiny", "upsell-choose-pokemon"]);

function getRelevantUpsells(cart: CartItem[]): Upsell[] {
  const packItems = cart.filter(
    (item) => item.type === "product" && (item.product as Product).category === "pack"
  );
  if (packItems.length === 0) return [];

  // If only VIP trainer in cart, no upsells
  const eligiblePacks = packItems.filter(
    (item) => !NO_UPSELL_PACKS.has(item.product.id)
  );
  if (eligiblePacks.length === 0) return [];

  // Filter upsells based on cart content
  const hasCd = packItems.some((item) =>
    (item.product as Product).items.some((i) => i.includes("CobbleDollars"))
  );
  const hasVip = packItems.some((item) => (item.product as Product).vip && (item.product as Product).vip !== "Permanent");

  // Get best pack for dynamic choose-pokemon price
  const bestPack = eligiblePacks[0]?.product.id || "";
  const choosePokemonPrice = CHOOSE_POKEMON_PRICES[bestPack] || 1.00;

  return UPSELLS.filter((u) => {
    if (u.id === CD_UPSELL && !hasCd) return false;
    if (u.id === VIP_UPSELL && !hasVip) return false;
    return true;
  }).map((u) => {
    // Apply dynamic pricing for choose-pokemon
    if (u.id === "upsell-choose-pokemon") {
      return { ...u, price: choosePokemonPrice };
    }
    return u;
  });
}

export default function BoutiquePage() {
  const [tab, setTab] = useState<"packs" | "cobbledollars" | "gacha">("packs");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [playerNameSet, setPlayerNameSet] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chosenPokemon, setChosenPokemon] = useState("");
  const [gradeUpsell, setGradeUpsell] = useState<{
    grade: string;
    color: string;
    amountNeeded: number;
  } | null>(null);

  // Persist player name in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cobblenite_player");
    if (saved) {
      setPlayerName(saved);
      setPlayerNameSet(true);
    }
  }, []);

  useEffect(() => {
    if (playerNameSet && playerName) {
      localStorage.setItem("cobblenite_player", playerName);
    }
  }, [playerNameSet, playerName]);

  // Persist cart in localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cobblenite_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as CartItem[];
        if (parsed.length > 0) setCart(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cobblenite_cart", JSON.stringify(cart));
  }, [cart]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price, 0);
  const relevantUpsells = getRelevantUpsells(cart);

  // Check grade upsell when cart changes
  useEffect(() => {
    if (!playerNameSet || !playerName) return;

    const checkGrade = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://79.137.34.10"}/api/player-balance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ player_name: playerName }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.next_grade && data.amount_needed > 0 && data.amount_needed <= 20) {
          const gradeInfo = GRADE_THRESHOLDS.find(
            (g) => g.grade.toLowerCase() === data.next_grade
          );
          if (gradeInfo) {
            setGradeUpsell({
              grade: gradeInfo.grade,
              color: gradeInfo.color,
              amountNeeded: data.amount_needed,
            });
          }
        } else {
          setGradeUpsell(null);
        }
      } catch {
        // Silent fail
      }
    };
    checkGrade();
  }, [playerNameSet, playerName, cartTotal]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { product, type: "product" }]);
  };

  const addUpsell = (upsell: Upsell) => {
    if (cart.some((item) => item.product.id === upsell.id)) return;
    setCart((prev) => [...prev, { product: upsell, type: "upsell" }]);
  };

  const removeFromCart = (index: number) => {
    const removed = cart[index];
    if (removed?.product.id === "upsell-choose-pokemon") {
      setChosenPokemon("");
    }
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (!playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) {
      setError("Pseudo Minecraft invalide (3-16 caracteres, lettres/chiffres/underscore)");
      return;
    }
    if (cart.length === 0) {
      setError("Ton panier est vide !");
      return;
    }

    // Validate choose-pokemon upsell has a Pokemon selected
    const hasChoosePokemon = cart.some((item) => item.product.id === "upsell-choose-pokemon");
    if (hasChoosePokemon && !chosenPokemon.trim()) {
      setError("Tu dois choisir un Pokemon pour l'option 'Choisis ton Pokemon'");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Build structured items array from flat cart
      // Products (packs/cd/gacha/fossils) become items, upsells attach to last pack
      const items: { packId: string; upsells: string[]; chosenPokemon?: string }[] = [];
      const upsellIds: string[] = [];

      for (const cartItem of cart) {
        if (cartItem.type === "upsell") {
          upsellIds.push(cartItem.product.id);
        } else {
          items.push({ packId: cartItem.product.id, upsells: [] });
        }
      }

      // Attach upsells to the first eligible pack
      if (upsellIds.length > 0) {
        const targetItem = items.find(
          (item) => !NO_UPSELL_PACKS.has(item.packId) && item.packId.startsWith("pack-")
        );
        if (targetItem) {
          targetItem.upsells = upsellIds;
          if (hasChoosePokemon) {
            targetItem.chosenPokemon = chosenPokemon.trim().toLowerCase();
          }
        }
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          playerName,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Erreur lors du paiement");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 1: Enter pseudo ───
  if (!playerNameSet) {
    return (
      <div className="min-h-screen bg-[#050510] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <Link href="/" className="mb-12">
            <img
              src="/logo.webp"
              alt="Cobblenite"
              className="w-20 h-20 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
            />
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Boutique</h1>
          <p className="text-white/40 mb-8">Entre ton pseudo Minecraft pour commencer</p>

          <div className="w-full max-w-sm">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) {
                  setPlayerNameSet(true);
                }
              }}
              placeholder="Ton pseudo Minecraft..."
              className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-center text-lg placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
              autoFocus
              maxLength={16}
            />
            {playerName && !playerName.match(/^[a-zA-Z0-9_]{3,16}$/) && (
              <p className="text-red-400/80 text-xs mt-2 text-center">3-16 caracteres, lettres/chiffres/underscore uniquement</p>
            )}
            <button
              onClick={() => {
                if (playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) setPlayerNameSet(true);
              }}
              disabled={!playerName.match(/^[a-zA-Z0-9_]{3,16}$/)}
              className="w-full mt-4 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
            >
              Acceder a la boutique
            </button>
          </div>

          <Link href="/" className="mt-8 text-white/20 text-sm hover:text-white/40 transition-colors">
            &larr; Retour au site
          </Link>
        </div>
      </div>
    );
  }

  // ─── Step 2: Shop ───
  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/logo.webp" alt="Cobblenite" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">Boutique</h1>
              <p className="text-white/30 text-xs">
                Connecte en tant que <span className="text-purple-400 font-medium">{playerName}</span>
                <button
                  onClick={() => { setPlayerNameSet(false); setCart([]); localStorage.removeItem("cobblenite_player"); localStorage.removeItem("cobblenite_cart"); }}
                  className="ml-2 text-white/20 hover:text-white/50 underline cursor-pointer"
                >
                  changer
                </button>
              </p>
            </div>
          </div>

          {/* Cart summary */}
          <button
            onClick={() => setShowCheckout(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span className="text-white text-sm font-medium">{cartTotal.toFixed(2)}&euro;</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-6">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit mx-auto">
          {[
            { key: "packs" as const, label: "Packs" },
            { key: "cobbledollars" as const, label: "CobbleDollars" },
            { key: "gacha" as const, label: "Jetons Gacha" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                tab === t.key
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {tab === "packs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [&>*:last-child:nth-child(3n+1)]:col-start-2">
            {PACKS.map((pack) => (
              <PackCard key={pack.id} product={pack} onAdd={() => addToCart(pack)} />
            ))}
          </div>
        )}

        {tab === "cobbledollars" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">CobbleDollars</h2>
              <p className="text-white/30 text-sm">Monnaie in-game, plus t&apos;achetes plus c&apos;est rentable</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {COBBLEDOLLARS.map((cd) => (
                <CurrencyCard key={cd.id} product={cd} onAdd={() => addToCart(cd)} />
              ))}
            </div>
          </>
        )}

        {tab === "gacha" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Jetons Gacha</h2>
              <p className="text-white/30 text-sm">Utilise-les dans les machines gacha en jeu</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {GACHA_TOKENS.map((token) => (
                <CurrencyCard key={token.id} product={token} onAdd={() => addToCart(token)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating cart bar */}
      {cart.length > 0 && !showCheckout && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-white">
              <span className="text-sm text-white/50">{cart.length} article{cart.length > 1 ? "s" : ""}</span>
              <span className="mx-3 text-white/20">|</span>
              <span className="text-lg font-bold">{cartTotal.toFixed(2)}&euro;</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-sm hover:from-purple-500 hover:to-blue-500 transition-all cursor-pointer"
            >
              Commander
            </button>
          </div>
        </div>
      )}

      {/* Checkout slide-over */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowCheckout(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-[#0a0a1a] border-l border-white/10 overflow-y-auto"
            style={{ animation: "slide-in-right 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Ton panier</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-white/30 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Player */}
              <div className="flex items-center gap-3 mb-6 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                <img
                  src={`https://mc-heads.net/avatar/${playerName}/32`}
                  alt={playerName}
                  className="w-8 h-8 rounded"
                />
                <span className="text-white font-medium">{playerName}</span>
              </div>

              {/* Cart items */}
              {cart.length === 0 ? (
                <p className="text-white/30 text-center py-8">Ton panier est vide</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/5 bg-white/[0.02]"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {item.type === "upsell" && (
                            <span className="text-purple-400 text-xs mr-1">+</span>
                          )}
                          {item.product.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-sm">{item.product.price.toFixed(2)}&euro;</span>
                        <button
                          onClick={() => removeFromCart(i)}
                          className="text-white/20 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pokemon selector for choose-pokemon upsell */}
              {cart.some((c) => c.product.id === "upsell-choose-pokemon") && (
                <div className="mb-4 p-3 rounded-xl border border-purple-500/20 bg-purple-500/5">
                  <p className="text-white text-sm font-medium mb-2">Quel Pokemon veux-tu ?</p>
                  <input
                    type="text"
                    value={chosenPokemon}
                    onChange={(e) => setChosenPokemon(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
                    placeholder="Ex: lucario, gardevoir, charizard..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
                    maxLength={30}
                  />
                  <p className="text-white/20 text-[10px] mt-1">Nom anglais du Pokemon (tel qu&apos;il apparait dans Cobblemon)</p>
                </div>
              )}

              {/* Upsells */}
              {relevantUpsells.length > 0 && (
                <div className="mb-6">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3 font-medium">
                    Ameliore ton pack
                  </p>
                  <div className="space-y-2">
                    {relevantUpsells.filter((u) => !cart.some((c) => c.product.id === u.id)).map(
                      (upsell) => {
                        const saved = upsell.realPrice - upsell.price;
                        return (
                          <button
                            key={upsell.id}
                            onClick={() => addUpsell(upsell)}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-dashed border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-pointer text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-medium">{upsell.name}</p>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-500/15 text-green-400 border border-green-500/20 whitespace-nowrap">
                                  -{Math.round((saved / upsell.realPrice) * 100)}%
                                </span>
                              </div>
                              <p className="text-white/30 text-xs">{upsell.description}</p>
                            </div>
                            <div className="ml-3 text-right whitespace-nowrap">
                              <span className="text-white/30 text-xs line-through block">{upsell.realPrice.toFixed(2)}&euro;</span>
                              <span className="text-purple-400 text-sm font-bold">+{upsell.price.toFixed(2)}&euro;</span>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* Grade upsell */}
              {gradeUpsell && (
                <div
                  className="mb-6 p-4 rounded-xl border"
                  style={{
                    borderColor: `${gradeUpsell.color}30`,
                    background: `${gradeUpsell.color}08`,
                  }}
                >
                  <p className="text-white text-sm font-medium mb-1">
                    Plus que{" "}
                    <span className="font-bold" style={{ color: gradeUpsell.color }}>
                      {gradeUpsell.amountNeeded.toFixed(2)}&euro;
                    </span>{" "}
                    pour debloquer
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: gradeUpsell.color }}
                  >
                    [{gradeUpsell.grade.toUpperCase()}]
                  </p>
                  <p className="text-white/30 text-xs mt-1">
                    Ajoute un produit pour atteindre ce grade !
                  </p>
                </div>
              )}

              {/* Total + pay */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50">Total</span>
                    <span className="text-2xl font-bold text-white">{cartTotal.toFixed(2)}&euro;</span>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-blue-500"
                  >
                    {loading ? "Redirection..." : `Payer ${cartTotal.toFixed(2)}\u20AC`}
                  </button>

                  <p className="text-white/15 text-[10px] text-center mt-3">
                    Paiement securise par Stripe. En procedant, tu acceptes la livraison immediate et renonces a ton droit de retractation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
