import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Prix dynamique "Choisis ton Pokemon" selon le pack (en centimes)
const CHOOSE_POKEMON_PRICE: Record<string, number> = {
  "pack-starter": 100,        // 1€
  "pack-combat": 200,         // 2€
  "pack-shiny": 300,          // 3€
  "pack-legendaire": 500,     // 5€
  "pack-legendaire-shiny": 500, // 5€
};

// Packs qui autorisent le dédoublement -50%
const DUPLICATABLE_PACKS = new Set([
  "pack-starter", "pack-combat", "pack-shiny", "pack-legendaire", "pack-legendaire-shiny",
]);

// Upsells valides par type de pack
const VALID_UPSELLS: Record<string, Set<string>> = {
  "pack-starter": new Set(["upsell-choose-pokemon", "upsell-iv", "upsell-shiny", "upsell-double-cd", "upsell-gacha5", "upsell-vip-extend"]),
  "pack-combat": new Set(["upsell-choose-pokemon", "upsell-iv", "upsell-shiny", "upsell-double-cd", "upsell-gacha5", "upsell-vip-extend"]),
  "pack-shiny": new Set(["upsell-choose-pokemon", "upsell-iv", "upsell-double-cd", "upsell-gacha5", "upsell-vip-extend"]),
  "pack-legendaire": new Set(["upsell-choose-pokemon", "upsell-iv", "upsell-double-cd", "upsell-gacha5", "upsell-vip-extend"]),
  "pack-legendaire-shiny": new Set(["upsell-choose-pokemon", "upsell-iv", "upsell-double-cd", "upsell-gacha5", "upsell-vip-extend"]),
};

// Catalogue des produits avec prix en centimes
const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  // Packs principaux
  "vip-trainer": {
    name: "Pass Dresseur",
    price: 499,
    description: "VIP permanent + Boost XP x2 (30j) + 5000 claim blocks + 5000 CD + 1 jeton gacha + 1 cle VIP",
  },
  "vip-plus": {
    name: "Pass Dresseur+",
    price: 899,
    description: "VIP+ permanent + Boost XP x4 (30j) + 10000 claim blocks + 25000 CD + 3 jetons gacha + 1 cle VIP",
  },
  "pack-starter": {
    name: "Kit du Dresseur",
    price: 699,
    description: "1 Pokemon aleatoire + 5000 CD + 27 balls + 5 rare candy + 3 jetons gacha + VIP 7j",
  },
  "pack-combat": {
    name: "Pack Arene",
    price: 1299,
    description: "1 Pokemon Combat Niv.30 + 15000 CD + 3 Ability Capsules + 10 Rare Candy + 5 jetons gacha + VIP 7j",
  },
  "pack-shiny": {
    name: "Etoile Chromee",
    price: 2499,
    description: "1 Pokemon Shiny Niv.40 + 30000 CD + 5 Ability Capsules + 15 Rare Candy + 10 jetons gacha + VIP 14j",
  },
  "pack-legendaire": {
    name: "Coffre du Champion",
    price: 3999,
    description: "1 Legendaire Niv.50 + 60000 CD + 1 Master Ball + 20 Rare Candy + 20 jetons gacha + VIP 21j",
  },
  "pack-legendaire-shiny": {
    name: "Relique Ancestrale",
    price: 4999,
    description: "1 Legendaire Shiny Niv.50 + 100000 CD + 3 Master Balls + 30 Rare Candy + 35 jetons gacha + VIP 30j",
  },
  // CobbleDollars
  "cd-5000": { name: "5 000 CobbleDollars", price: 199, description: "5 000 CobbleDollars" },
  "cd-15000": { name: "15 000 CobbleDollars", price: 499, description: "15 000 CobbleDollars (-17%)" },
  "cd-50000": { name: "50 000 CobbleDollars", price: 1299, description: "50 000 CobbleDollars (-35%)" },
  "cd-100000": { name: "100 000 CobbleDollars", price: 1999, description: "100 000 CobbleDollars (-50%)" },
  "cd-250000": { name: "250 000 CobbleDollars", price: 3999, description: "250 000 CobbleDollars (-60%)" },
  "cd-500000": { name: "500 000 CobbleDollars", price: 6999, description: "500 000 CobbleDollars (-65%)" },
  // Jetons Gacha
  "gacha-1": { name: "1 Jeton Gacha", price: 199, description: "1 Jeton Gacha" },
  "gacha-5": { name: "5 Jetons Gacha", price: 799, description: "5 Jetons Gacha (-20%)" },
  "gacha-10": { name: "10 Jetons Gacha", price: 1499, description: "10 Jetons Gacha (-25%)" },
  "gacha-25": { name: "25 Jetons Gacha", price: 2999, description: "25 Jetons Gacha (-40%)" },
  "gacha-50": { name: "50 Jetons Gacha", price: 4999, description: "50 Jetons Gacha (-50%)" },
  // Fossiles
  "fossil-talent": { name: "Fossile Talent Cache", price: 399, description: "Revele le talent cache de ton Pokemon" },
  "fossil-shiny": { name: "Fossile Shiny", price: 499, description: "Rend ton Pokemon chromatique (shiny)" },
  "fossil-maxiv": { name: "Fossile Max IV", price: 399, description: "Passe ton Pokemon en 6IV parfaits" },
  "fossil-parfait": { name: "Fossile Parfait", price: 999, description: "Talent Cache + Shiny + 6IV - Le combo ultime" },
  // Options upsell
  "upsell-choose-pokemon": { name: "Choisis ton Pokemon", price: 100, description: "Choisis ton Pokemon au lieu d'un aleatoire" },
  "upsell-shiny": { name: "Shiny Boost", price: 299, description: "Ton Pokemon devient shiny" },
  "upsell-iv": { name: "IV Parfaits", price: 199, description: "Ton Pokemon passe 6IV parfaits" },
  "upsell-double-cd": { name: "Double CobbleDollars", price: 149, description: "x2 les CD du pack" },
  "upsell-gacha5": { name: "+5 Jetons Gacha", price: 399, description: "5 jetons gacha bonus" },
  "upsell-vip-extend": { name: "VIP Etendu", price: 249, description: "Double la duree VIP du pack" },
};

// Cross-sell discounts autorisés (en %) - sécurité serveur
const ALLOWED_CROSS_SELL_DISCOUNTS = new Set([0, 15, 20, 30, 40, 50]);

// ── Rate limiting simple en mémoire ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // max requêtes
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
    // ── Rate limiting ──
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return NextResponse.json({ error: "Trop de requetes, reessaie dans 1 minute" }, { status: 429 });
    }

    // ── Parse body avec limite de taille ──
    const contentLength = parseInt(req.headers.get("content-length") || "0");
    if (contentLength > 10_000) {
      return NextResponse.json({ error: "Requete trop volumineuse" }, { status: 413 });
    }

    const body = await req.json();
    const { items, playerName, promoCode, anonymousMode } = body as {
      items: { packId: string; upsells: string[]; isDuplicate?: boolean; crossSellDiscount?: number }[];
      playerName: string;
      promoCode?: string;
      anonymousMode?: boolean;
    };

    // ── Validation pseudo ──
    if (!playerName || typeof playerName !== "string" || !playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) {
      return NextResponse.json({ error: "Pseudo Minecraft invalide" }, { status: 400 });
    }

    // ── Validation items ──
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Aucun produit selectionne" }, { status: 400 });
    }
    if (items.length > 20) {
      return NextResponse.json({ error: "Trop de produits (max 20)" }, { status: 400 });
    }

    // ── Validation structurelle de chaque item ──
    for (const entry of items) {
      if (!entry || typeof entry.packId !== "string") {
        return NextResponse.json({ error: "Format de commande invalide" }, { status: 400 });
      }
      if (!Array.isArray(entry.upsells)) {
        return NextResponse.json({ error: "Format des options invalide" }, { status: 400 });
      }
      if (entry.upsells.length > 7) {
        return NextResponse.json({ error: "Trop d'options par pack (max 7)" }, { status: 400 });
      }
    }

    // ── Validation des doublons ──
    const duplicateCounts = new Map<string, number>();
    for (const entry of items) {
      if (entry.isDuplicate) {
        // Vérifier que le pack est duplicable
        if (!DUPLICATABLE_PACKS.has(entry.packId)) {
          return NextResponse.json({ error: "Ce pack ne peut pas etre duplique" }, { status: 400 });
        }
        // Vérifier qu'il y a un original du même pack dans le panier
        const hasOriginal = items.some((e) => e.packId === entry.packId && !e.isDuplicate);
        if (!hasOriginal) {
          return NextResponse.json({ error: "Pack original requis pour un doublon" }, { status: 400 });
        }
        // Max 1 doublon par pack
        const count = (duplicateCounts.get(entry.packId) || 0) + 1;
        if (count > 1) {
          return NextResponse.json({ error: "Maximum 1 doublon par pack" }, { status: 400 });
        }
        duplicateCounts.set(entry.packId, count);
      }
    }

    // ── Build line items avec validation stricte ──
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const allProductIds: string[] = [];

    for (const entry of items) {
      const pack = PRODUCTS[entry.packId];
      if (!pack) {
        return NextResponse.json({ error: `Produit inconnu: ${entry.packId}` }, { status: 400 });
      }
      allProductIds.push(entry.packId);

      // Validation cross-sell discount
      const csDiscount = entry.crossSellDiscount || 0;
      if (!ALLOWED_CROSS_SELL_DISCOUNTS.has(csDiscount)) {
        return NextResponse.json({ error: "Reduction invalide" }, { status: 400 });
      }
      if (entry.isDuplicate && csDiscount > 0) {
        return NextResponse.json({ error: "Cumul de reductions interdit" }, { status: 400 });
      }

      let packPrice = pack.price;
      if (entry.isDuplicate) packPrice = Math.round(packPrice / 2);
      if (csDiscount > 0) packPrice = Math.round(packPrice * (100 - csDiscount) / 100);
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: entry.isDuplicate ? `${pack.name} (x2 -50%)` : csDiscount > 0 ? `${pack.name} (-${csDiscount}%)` : pack.name,
            description: pack.description,
          },
          unit_amount: packPrice,
        },
        quantity: 1,
      });

      // ── Validation et ajout des upsells ──
      const validUpsells = VALID_UPSELLS[entry.packId];
      const choosePokemonPrice = CHOOSE_POKEMON_PRICE[entry.packId] || 100;
      const seenUpsells = new Set<string>();

      for (const upsellId of entry.upsells) {
        // Vérifier que l'upsell existe
        const upsell = PRODUCTS[upsellId];
        if (!upsell) {
          return NextResponse.json({ error: `Option inconnue: ${upsellId}` }, { status: 400 });
        }
        // Vérifier que l'upsell est autorisé pour ce pack
        if (!validUpsells || !validUpsells.has(upsellId)) {
          return NextResponse.json({ error: `Option "${upsell.name}" non disponible pour "${pack.name}"` }, { status: 400 });
        }
        // Pas de doublons d'upsell sur le même pack
        if (seenUpsells.has(upsellId)) {
          return NextResponse.json({ error: `Option "${upsell.name}" en double` }, { status: 400 });
        }
        seenUpsells.add(upsellId);

        allProductIds.push(upsellId);
        const unitAmount = upsellId === "upsell-choose-pokemon" ? choosePokemonPrice : upsell.price;
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `${upsell.name} (${pack.name})`,
              description: upsell.description,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        });
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cobblenite.fr";

    // ── Resolve promo code si fourni ──
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (promoCode && typeof promoCode === "string" && promoCode.length <= 30) {
      try {
        const promoCodes = await stripe.promotionCodes.list({ code: promoCode, active: true, limit: 1 });
        if (promoCodes.data.length > 0) {
          discounts = [{ promotion_code: promoCodes.data[0].id }];
        }
      } catch { /* ignore invalid promo code */ }
    }

    // Split long metadata across multiple keys (Stripe 500 char limit per value)
    const productIdsJson = JSON.stringify(allProductIds);
    const itemsDetailJson = JSON.stringify(items);
    const metadata: Record<string, string> = {
      player_name: playerName,
      promo_code: promoCode || "",
      vip_hidden: anonymousMode ? "true" : "false",
    };
    const chunk = (str: string, size: number) => {
      const r: string[] = [];
      for (let i = 0; i < str.length; i += size) r.push(str.slice(i, i + size));
      return r;
    };
    chunk(productIdsJson, 490).forEach((c, i) => {
      metadata[i === 0 ? "product_ids" : `product_ids_${i}`] = c;
    });
    chunk(itemsDetailJson, 490).forEach((c, i) => {
      metadata[i === 0 ? "items_detail" : `items_detail_${i}`] = c;
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "link"],
      line_items: lineItems,
      mode: "payment",
      ...(discounts ? { discounts } : { allow_promotion_codes: true }),
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#boutique`,
      metadata,
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message:
            "Je demande la livraison immediate de mon achat et renonce a mon droit de retractation de 14 jours conformement a l'article L221-28 du Code de la consommation.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Erreur lors de la creation du paiement" }, { status: 500 });
  }
}
