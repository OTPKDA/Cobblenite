"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Boutique data ───
type ShopProduct = {
  id: string;
  name: string;
  price: number;
  color: string;
  sprite?: string;
  customImage?: string;
  tagline?: string;
  items: string[];
  vip?: string;
  badge?: string;
  oldPrice?: number;
  category: "pack" | "cobbledollars" | "gacha" | "fossile";
  discount?: string;
  pokemonPool?: { name: string; sprite: string }[];
  choosePrice?: number;
  poolHidden?: number; // nombre de Pokemon caches ("et plus...")
};

type ShopUpsell = {
  id: string;
  name: string;
  price: number;
  realPrice: number;
  description: string;
};

const SHOP_PRODUCTS: ShopProduct[] = [
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
    price: 8.99,
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
      "Particules cosmetiques",
      "/fly dans le lobby",
      "/craft partout",
      "/pokeheal pour soigner ses Pokemon",
      "/pc accessible partout",
      "/feed pour se nourrir instantanement",
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
    choosePrice: 1,
    pokemonPool: [
      // Gen 1
      { name: "Bulbizarre", sprite: "bulbasaur" },
      { name: "Salameche", sprite: "charmander" },
      { name: "Carapuce", sprite: "squirtle" },
      // Gen 2
      { name: "Germignon", sprite: "chikorita" },
      { name: "Hericendre", sprite: "cyndaquil" },
      { name: "Kaiminus", sprite: "totodile" },
      // Gen 3
      { name: "Arcko", sprite: "treecko" },
      { name: "Poussifeu", sprite: "torchic" },
      { name: "Gobou", sprite: "mudkip" },
      // Gen 4
      { name: "Tortipouss", sprite: "turtwig" },
      { name: "Ouisticram", sprite: "chimchar" },
      { name: "Tiplouf", sprite: "piplup" },
      // Gen 5
      { name: "Vipelierre", sprite: "snivy" },
      { name: "Gruikui", sprite: "tepig" },
      { name: "Moustillon", sprite: "oshawott" },
      // Gen 6
      { name: "Marisson", sprite: "chespin" },
      { name: "Feunnec", sprite: "fennekin" },
      { name: "Grenousse", sprite: "froakie" },
      // Gen 7
      { name: "Brindibou", sprite: "rowlet" },
      { name: "Flamiaou", sprite: "litten" },
      { name: "Otaquin", sprite: "popplio" },
      // Gen 8
      { name: "Ouistempo", sprite: "grookey" },
      { name: "Flambino", sprite: "scorbunny" },
      { name: "Larmeleon", sprite: "sobble" },
      // Gen 9
      { name: "Poussacha", sprite: "sprigatito" },
      { name: "Chochodile", sprite: "fuecoco" },
      { name: "Coiffeton", sprite: "quaxly" },
      // Fan favorites
      { name: "Pikachu", sprite: "pikachu" },
      { name: "Evoli", sprite: "eevee" },
      { name: "Goupix", sprite: "vulpix" },
      { name: "Riolu", sprite: "riolu" },
      { name: "Caninos", sprite: "growlithe" },
      { name: "Abra", sprite: "abra" },
      { name: "Minidraco", sprite: "dratini" },
      { name: "Lixy", sprite: "shinx" },
      { name: "Tarsal", sprite: "ralts" },
      { name: "Ponyta", sprite: "ponyta" },
      { name: "Fantominus", sprite: "gastly" },
      { name: "Embrylex", sprite: "larvitar" },
      { name: "Draby", sprite: "bagon" },
      { name: "Coupenotte", sprite: "axew" },
      { name: "Zorua", sprite: "zorua" },
      { name: "Solochi", sprite: "deino" },
      { name: "Griknot", sprite: "gible" },
      { name: "Terhal", sprite: "beldum" },
      { name: "Togepi", sprite: "togepi" },
      { name: "Barpau", sprite: "feebas" },
      { name: "Kraknoix", sprite: "trapinch" },
      { name: "Galekid", sprite: "aron" },
      { name: "Marcacrin", sprite: "swinub" },
      { name: "Insecateur", sprite: "scyther" },
      { name: "Rhinocorne", sprite: "rhyhorn" },
      { name: "Hypotrempe", sprite: "horsea" },
      { name: "Mimiqui", sprite: "mimikyu" },
      { name: "Frigodo", sprite: "frigibax" },
      { name: "Fantyrm", sprite: "dreepy" },
    ],
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
      "1 Pokemon Combat aleatoire Niv.30",
      "15 000 CobbleDollars",
      "3 Ability Capsules",
      "10 Rare Candy",
      "5 Jetons Gacha",
    ],
    vip: "7 jours",
    choosePrice: 2,
    pokemonPool: [
      // Top picks
      { name: "Lucario", sprite: "lucario" },
      { name: "Dracaufeu", sprite: "charizard" },
      { name: "Garchomp", sprite: "garchomp" },
      { name: "Gardevoir", sprite: "gardevoir" },
      { name: "Ectoplasma", sprite: "gengar" },
      { name: "Amphinobi", sprite: "greninja" },
      { name: "Dracolosse", sprite: "dragonite" },
      { name: "Brasegali", sprite: "blaziken" },
      { name: "Tortank", sprite: "blastoise" },
      { name: "Metalosse", sprite: "metagross" },
      // More combat Pokemon
      { name: "Florizarre", sprite: "venusaur" },
      { name: "Tyranocif", sprite: "tyranitar" },
      { name: "Drattak", sprite: "salamence" },
      { name: "Cizayox", sprite: "scizor" },
      { name: "Jungko", sprite: "sceptile" },
      { name: "Leviator", sprite: "gyarados" },
      { name: "Simiabraz", sprite: "infernape" },
      { name: "Pingoleon", sprite: "empoleon" },
      { name: "Torterra", sprite: "torterra" },
      { name: "Carchacrok", sprite: "garchomp" },
      { name: "Tranchodon", sprite: "haxorus" },
      { name: "Trioxhydre", sprite: "hydreigon" },
      { name: "Pyrax", sprite: "volcarona" },
      { name: "Scalpereur", sprite: "kingambit" },
      { name: "Lanssorien", sprite: "dragapult" },
      { name: "Zoroark", sprite: "zoroark" },
      { name: "Gallame", sprite: "gallade" },
      { name: "Togekiss", sprite: "togekiss" },
      { name: "Dimoret", sprite: "weavile" },
      { name: "Demolosse", sprite: "houndoom" },
      { name: "Glaivodo", sprite: "baxcalibur" },
      { name: "Courrousinge", sprite: "annihilape" },
      { name: "Malvalame", sprite: "ceruledge" },
      { name: "Carmadura", sprite: "armarouge" },
      { name: "Forgelina", sprite: "tinkaton" },
      { name: "Pyrobut", sprite: "cinderace" },
      { name: "Miascarade", sprite: "meowscarada" },
      { name: "Flamigator", sprite: "skeledirge" },
      { name: "Palmaval", sprite: "quaquaval" },
      { name: "Aligatueur", sprite: "feraligatr" },
      { name: "Metamorph", sprite: "ditto" },
    ],
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
      "1 Pokemon Shiny garanti Niv.40",
      "30 000 CobbleDollars",
      "5 Ability Capsules",
      "15 Rare Candy",
      "10 Jetons Gacha",
    ],
    vip: "14 jours",
    choosePrice: 3,
    pokemonPool: [
      // Les plus beaux shinys
      { name: "Noctali", sprite: "umbreon" },
      { name: "Dracaufeu", sprite: "charizard" },
      { name: "Leviator", sprite: "gyarados" },
      { name: "Ectoplasma", sprite: "gengar" },
      { name: "Lucario", sprite: "lucario" },
      { name: "Amphinobi", sprite: "greninja" },
      { name: "Nymphali", sprite: "sylveon" },
      { name: "Gardevoir", sprite: "gardevoir" },
      { name: "Zoroark", sprite: "zoroark" },
      { name: "Dracolosse", sprite: "dragonite" },
      // Eevolutions
      { name: "Mentali", sprite: "espeon" },
      { name: "Aquali", sprite: "vaporeon" },
      { name: "Voltali", sprite: "jolteon" },
      { name: "Pyroli", sprite: "flareon" },
      { name: "Phyllali", sprite: "leafeon" },
      { name: "Givrali", sprite: "glaceon" },
      // Classiques shinys
      { name: "Drattak", sprite: "salamence" },
      { name: "Metalosse", sprite: "metagross" },
      { name: "Tyranocif", sprite: "tyranitar" },
      { name: "Garchomp", sprite: "garchomp" },
      { name: "Cizayox", sprite: "scizor" },
      { name: "Arcanin", sprite: "arcanine" },
      { name: "Feunard", sprite: "ninetales" },
      { name: "Milobellus", sprite: "milotic" },
      { name: "Lokhlass", sprite: "lapras" },
      { name: "Ronflex", sprite: "snorlax" },
      { name: "Absol", sprite: "absol" },
      { name: "Demolosse", sprite: "houndoom" },
      { name: "Libegon", sprite: "flygon" },
      { name: "Altaria", sprite: "altaria" },
      { name: "Luxray", sprite: "luxray" },
      { name: "Lugulabre", sprite: "chandelure" },
      // Nouvelles gens
      { name: "Lanssorien", sprite: "dragapult" },
      { name: "Scalpereur", sprite: "kingambit" },
      { name: "Malvalame", sprite: "ceruledge" },
      { name: "Carmadura", sprite: "armarouge" },
      { name: "Glaivodo", sprite: "baxcalibur" },
      { name: "Courrousinge", sprite: "annihilape" },
      { name: "Mimiqui", sprite: "mimikyu" },
      { name: "Salarsen", sprite: "toxtricity" },
      { name: "Corvaillus", sprite: "corviknight" },
      { name: "Beldeneige", sprite: "frosmoth" },
      // Starters finaux shinys
      { name: "Florizarre", sprite: "venusaur" },
      { name: "Tortank", sprite: "blastoise" },
      { name: "Brasegali", sprite: "blaziken" },
      { name: "Jungko", sprite: "sceptile" },
      { name: "Laggron", sprite: "swampert" },
      { name: "Simiabraz", sprite: "infernape" },
      { name: "Pyrobut", sprite: "cinderace" },
      { name: "Miascarade", sprite: "meowscarada" },
      { name: "Flamigator", sprite: "skeledirge" },
    ],
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
      "1 Pokemon Legendaire aleatoire Niv.50",
      "60 000 CobbleDollars",
      "1 Master Ball",
      "20 Rare Candy",
      "20 Jetons Gacha",
    ],
    vip: "21 jours",
    choosePrice: 5,
    pokemonPool: [
      // Legendaires majeurs
      { name: "Mewtwo", sprite: "mewtwo" },
      { name: "Rayquaza", sprite: "rayquaza" },
      { name: "Lugia", sprite: "lugia" },
      { name: "Ho-Oh", sprite: "ho-oh" },
      { name: "Dialga", sprite: "dialga" },
      { name: "Palkia", sprite: "palkia" },
      { name: "Giratina", sprite: "giratina" },
      { name: "Kyogre", sprite: "kyogre" },
      { name: "Groudon", sprite: "groudon" },
      { name: "Reshiram", sprite: "reshiram" },
      // Autres legendaires
      { name: "Zekrom", sprite: "zekrom" },
      { name: "Kyurem", sprite: "kyurem" },
      { name: "Xerneas", sprite: "xerneas" },
      { name: "Yveltal", sprite: "yveltal" },
      { name: "Zygarde", sprite: "zygarde" },
      { name: "Solgaleo", sprite: "solgaleo" },
      { name: "Lunala", sprite: "lunala" },
      { name: "Necrozma", sprite: "necrozma" },
      { name: "Zacian", sprite: "zacian" },
      { name: "Zamazenta", sprite: "zamazenta" },
      { name: "Eternatus", sprite: "eternatus" },
      { name: "Koraidon", sprite: "koraidon" },
      { name: "Miraidon", sprite: "miraidon" },
      // Oiseaux legendaires
      { name: "Artikodin", sprite: "articuno" },
      { name: "Electhor", sprite: "zapdos" },
      { name: "Sulfura", sprite: "moltres" },
      // Trio legendaires
      { name: "Raikou", sprite: "raikou" },
      { name: "Entei", sprite: "entei" },
      { name: "Suicune", sprite: "suicune" },
      { name: "Latios", sprite: "latios" },
      { name: "Latias", sprite: "latias" },
      // Sous-legendaires
      { name: "Heatran", sprite: "heatran" },
      { name: "Regigigas", sprite: "regigigas" },
      { name: "Cresselia", sprite: "cresselia" },
      { name: "Regirock", sprite: "regirock" },
      { name: "Regice", sprite: "regice" },
      { name: "Registeel", sprite: "registeel" },
    ],
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
      "1 Pokemon Legendaire Shiny Niv.50",
      "100 000 CobbleDollars",
      "3 Master Balls",
      "30 Rare Candy",
      "35 Jetons Gacha",
    ],
    vip: "30 jours",
    choosePrice: 5,
    pokemonPool: [
      // Legendaires majeurs shiny
      { name: "Mewtwo", sprite: "mewtwo" },
      { name: "Rayquaza", sprite: "rayquaza" },
      { name: "Lugia", sprite: "lugia" },
      { name: "Ho-Oh", sprite: "ho-oh" },
      { name: "Dialga", sprite: "dialga" },
      { name: "Palkia", sprite: "palkia" },
      { name: "Giratina", sprite: "giratina" },
      { name: "Kyogre", sprite: "kyogre" },
      { name: "Groudon", sprite: "groudon" },
      { name: "Reshiram", sprite: "reshiram" },
      // Suite legendaires shiny
      { name: "Zekrom", sprite: "zekrom" },
      { name: "Kyurem", sprite: "kyurem" },
      { name: "Xerneas", sprite: "xerneas" },
      { name: "Yveltal", sprite: "yveltal" },
      { name: "Solgaleo", sprite: "solgaleo" },
      { name: "Lunala", sprite: "lunala" },
      { name: "Necrozma", sprite: "necrozma" },
      { name: "Zacian", sprite: "zacian" },
      { name: "Zamazenta", sprite: "zamazenta" },
      { name: "Koraidon", sprite: "koraidon" },
      { name: "Miraidon", sprite: "miraidon" },
      // Oiseaux + betes shiny
      { name: "Artikodin", sprite: "articuno" },
      { name: "Electhor", sprite: "zapdos" },
      { name: "Sulfura", sprite: "moltres" },
      { name: "Raikou", sprite: "raikou" },
      { name: "Entei", sprite: "entei" },
      { name: "Suicune", sprite: "suicune" },
      { name: "Latios", sprite: "latios" },
      { name: "Latias", sprite: "latias" },
      // Mythiques shiny
      { name: "Arceus", sprite: "arceus" },
      { name: "Mew", sprite: "mew" },
      { name: "Celebi", sprite: "celebi" },
      { name: "Jirachi", sprite: "jirachi" },
      { name: "Darkrai", sprite: "darkrai" },
      { name: "Deoxys", sprite: "deoxys" },
      { name: "Manaphy", sprite: "manaphy" },
      { name: "Victini", sprite: "victini" },
      { name: "Marshadow", sprite: "marshadow" },
      { name: "Zeraora", sprite: "zeraora" },
    ],
  },
];

const SHOP_CD: ShopProduct[] = [
  { id: "cd-5000", name: "5 000", price: 1.99, color: "#fbbf24", category: "cobbledollars", items: ["5 000 CobbleDollars"], customImage: "/cd-5000.webp" },
  { id: "cd-15000", name: "15 000", price: 4.99, color: "#fbbf24", category: "cobbledollars", items: ["15 000 CobbleDollars"], discount: "-17%", customImage: "/cd-15000.webp" },
  { id: "cd-50000", name: "50 000", price: 12.99, color: "#fbbf24", category: "cobbledollars", items: ["50 000 CobbleDollars"], discount: "-35%", customImage: "/cd-50000.webp" },
  { id: "cd-100000", name: "100 000", price: 19.99, color: "#fbbf24", category: "cobbledollars", items: ["100 000 CobbleDollars"], discount: "-50%", badge: "Best seller", customImage: "/cd-100000.webp" },
  { id: "cd-250000", name: "250 000", price: 39.99, color: "#fbbf24", category: "cobbledollars", items: ["250 000 CobbleDollars"], discount: "-60%", customImage: "/cd-250000.webp" },
  { id: "cd-500000", name: "500 000", price: 69.99, color: "#fbbf24", category: "cobbledollars", items: ["500 000 CobbleDollars"], discount: "-65%", badge: "Meilleure offre", customImage: "/cd-500000.webp" },
];

const SHOP_GACHA: ShopProduct[] = [
  { id: "gacha-1", name: "1 Jeton", tagline: "Tente ta chance une fois", price: 1.99, color: "#c084fc", category: "gacha", items: ["1 tirage dans la machine Gacha", "Pokemon aleatoire parmi 4 pools"], customImage: "/gacha-1.webp" },
  { id: "gacha-5", name: "5 Jetons", tagline: "Plus de tirages, plus de chances", price: 7.99, color: "#c084fc", category: "gacha", items: ["5 tirages Gacha", "Economise 20% vs achat unitaire"], discount: "-20%", customImage: "/gacha-5.webp" },
  { id: "gacha-10", name: "10 Jetons", tagline: "Le choix des dresseurs malins", price: 14.99, color: "#c084fc", category: "gacha", items: ["10 tirages Gacha", "Shinys, legendaires, 6IV possibles"], discount: "-25%", badge: "Populaire", customImage: "/gacha-10.webp" },
  { id: "gacha-25", name: "25 Jetons", tagline: "Chasse intensive", price: 29.99, color: "#c084fc", category: "gacha", items: ["25 tirages Gacha", "Chances accrues de tomber sur un jackpot"], discount: "-40%", customImage: "/gacha-25.webp" },
  { id: "gacha-50", name: "50 Jetons", tagline: "Le graal du collectionneur", price: 49.99, color: "#c084fc", category: "gacha", items: ["50 tirages Gacha", "Meilleur rapport qualite-prix"], discount: "-50%", badge: "Meilleure offre", customImage: "/gacha-50.webp" },
];

// ── Pools Gacha complets (Cobblemon 1.7.3 — ~1000 Pokemon) ──
const GACHA_POOLS = {
  sauvage: {
    commun: [
      "Rattata", "Pidgey", "Caterpie", "Weedle", "Spearow", "Ekans", "Sandshrew", "Nidoran♀", "Nidoran♂", "Zubat",
      "Oddish", "Paras", "Venonat", "Diglett", "Meowth", "Psyduck", "Mankey", "Poliwag", "Bellsprout", "Tentacool",
      "Geodude", "Ponyta", "Slowpoke", "Magnemite", "Doduo", "Seel", "Grimer", "Shellder", "Drowzee", "Krabby",
      "Voltorb", "Exeggcute", "Cubone", "Koffing", "Goldeen", "Staryu", "Magikarp", "Sentret", "Hoothoot", "Ledyba",
      "Spinarak", "Chinchou", "Marill", "Hoppip", "Sunkern", "Wooper", "Murkrow", "Misdreavus", "Pineco", "Snubbull",
      "Teddiursa", "Slugma", "Swinub", "Remoraid", "Houndour", "Phanpy", "Stantler", "Poochyena", "Zigzagoon", "Wurmple",
      "Lotad", "Seedot", "Wingull", "Surskit", "Shroomish", "Slakoth", "Whismur", "Makuhita", "Nosepass", "Skitty",
      "Meditite", "Electrike", "Gulpin", "Numel", "Spoink", "Swablu", "Barboach", "Baltoy", "Bidoof", "Starly",
      "Kricketot", "Shinx", "Budew", "Burmy", "Combee", "Buizel", "Cherubi", "Shellos", "Buneary", "Glameow",
      "Stunky", "Bronzor", "Chatot", "Finneon", "Patrat", "Lillipup", "Purrloin", "Pidove", "Woobat", "Drilbur",
      "Tympole", "Sewaddle", "Venipede", "Cottonee", "Petilil", "Basculin", "Sandile", "Dwebble", "Scraggy", "Trubbish",
      "Minccino", "Gothita", "Solosis", "Ducklett", "Vanillite", "Deerling", "Emolga", "Karrablast", "Foongus", "Frillish",
      "Joltik", "Ferroseed", "Klink", "Tynamo", "Litwick", "Cubchoo", "Shelmet", "Stunfisk", "Pawniard", "Bunnelby",
      "Fletchling", "Scatterbug", "Litleo", "Flabebe", "Skiddo", "Pancham", "Furfrou", "Espurr", "Honedge", "Spritzee",
      "Swirlix", "Inkay", "Binacle", "Skrelp", "Clauncher", "Helioptile", "Dedenne", "Carbink", "Goomy", "Pikipek",
      "Yungoos", "Grubbin", "Crabrawler", "Cutiefly", "Rockruff", "Wishiwashi", "Mareanie", "Mudbray", "Dewpider",
      "Fomantis", "Morelull", "Salandit", "Stufful", "Bounsweet", "Comfey", "Sandygast", "Pyukumuku", "Rookidee",
      "Skwovet", "Nickit", "Gossifleur", "Wooloo", "Chewtle", "Yamper", "Rolycoly", "Applin", "Silicobra", "Cramorant",
      "Arrokuda", "Toxel", "Sizzlipede", "Clobbopus", "Sinistea", "Hatenna", "Impidimp", "Milcery", "Snom", "Stonjourner",
      "Eiscue", "Morpeko", "Cufant", "Lechonk", "Tarountula", "Nymble", "Pawmi", "Tandemaus", "Fidough", "Smoliv",
      "Squawkabilly", "Nacli", "Charcadet", "Tadbulb", "Wattrel", "Maschiff", "Shroodle", "Bramblin", "Toedscool",
      "Capsakid", "Rellor", "Flittle", "Tinkatink", "Wiglett", "Bombirdier", "Finizen", "Varoom", "Cyclizar",
      "Orthworm", "Glimmet", "Greavard", "Flamigo", "Cetoddle", "Veluza", "Dondozo", "Frigibax"
    ],
    rare: [
      "Eevee", "Pikachu", "Growlithe", "Vulpix", "Abra", "Gastly", "Dratini", "Larvitar", "Riolu", "Axew",
      "Bulbasaur", "Charmander", "Squirtle", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic", "Mudkip",
      "Turtwig", "Chimchar", "Piplup", "Snivy", "Tepig", "Oshawott", "Chespin", "Fennekin", "Froakie",
      "Rowlet", "Litten", "Popplio", "Grookey", "Scorbunny", "Sobble", "Sprigatito", "Fuecoco", "Quaxly",
      "Ralts", "Bagon", "Beldum", "Gible", "Deino", "Golett", "Zorua", "Phantump", "Honedge", "Noibat",
      "Jangmo-o", "Dreepy", "Frigibax", "Togepi", "Snorunt", "Feebas", "Trapinch", "Aron", "Rhyhorn",
      "Horsea", "Natu", "Sneasel", "Gligar", "Elekid", "Magby", "Munchlax", "Happiny", "Tyrogue",
      "Scyther", "Pinsir", "Tauros", "Kangaskhan", "Chansey", "Porygon", "Aerodactyl", "Heracross",
      "Skarmory", "Miltank", "Absol", "Sableye", "Mawile", "Tropius", "Relicanth", "Spiritomb", "Rotom",
      "Sigilyph", "Bouffalant", "Durant", "Heatmor", "Hawlucha", "Klefki", "Drampa", "Turtonator",
      "Mimikyu", "Dhelmise", "Falinks", "Duraludon", "Pincurchin", "Indeedee", "Dracozolt", "Arctozolt"
    ],
    epique: [
      "Lucario", "Gengar", "Arcanine", "Dragonair", "Scyther", "Lapras", "Snorlax", "Togekiss",
      "Alakazam", "Machamp", "Golem", "Gyarados", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon",
      "Leafeon", "Glaceon", "Sylveon", "Steelix", "Blissey", "Milotic", "Flygon", "Aggron", "Weavile",
      "Electivire", "Magmortar", "Togekiss", "Gallade", "Roserade", "Honchkrow", "Mismagius", "Gliscor",
      "Porygon-Z", "Dusknoir", "Froslass", "Chandelure", "Haxorus", "Zoroark", "Braviary", "Mandibuzz",
      "Aegislash", "Trevenant", "Noivern", "Goodra", "Kommo-o", "Golisopod", "Palossand", "Toxtricity",
      "Grimmsnarl", "Runerigus", "Polteageist", "Frosmoth", "Dragapult", "Ceruledge", "Armarouge",
      "Palafin", "Annihilape", "Kingambit", "Baxcalibur", "Tinkaton", "Kilowattrel", "Dondozo"
    ],
    jackpot: ["Ditto Shiny 6IV"],
  },
  combat: {
    bon: [
      "Excadrill", "Toxapex", "Ferrothorn", "Rotom-Wash", "Corviknight", "Clefable", "Hippowdon", "Amoonguss",
      "Skarmory", "Blissey", "Tentacruel", "Slowbro", "Quagsire", "Gastrodon", "Mandibuzz", "Umbreon",
      "Vaporeon", "Forretress", "Donphan", "Swampert", "Milotic", "Gliscor", "Tangrowth", "Alomomola",
      "Jellicent", "Reuniclus", "Cofagrigus", "Amoonguss", "Chesnaught", "Araquanid", "Palossand",
      "Toxicroak", "Breloom", "Infernape", "Mienshao", "Conkeldurr", "Machamp", "Hariyama", "Heracross",
      "Scizor", "Magnezone", "Jolteon", "Raikou", "Starmie", "Alakazam", "Gengar", "Roserade", "Weavile",
      "Zoroark", "Bisharp", "Krookodile", "Chandelure", "Darmanitan", "Haxorus", "Flygon", "Gyarados",
      "Azumarill", "Crawdaunt", "Sharpedo", "Drapion", "Scolipede", "Galvantula", "Whimsicott",
      "Torkoal", "Ninetales", "Arcanine", "Rapidash", "Talonflame", "Staraptor", "Braviary", "Hawlucha",
      "Noivern", "Crobat", "Pelipper", "Politoed", "Tyranitar-Sand", "Hippowdon-Sand", "Abomasnow"
    ],
    tresBon: [
      "Garchomp", "Dragonite", "Tyranitar", "Salamence", "Metagross", "Volcarona", "Hydreigon", "Kingambit",
      "Dragapult", "Kommo-o", "Goodra", "Haxorus", "Flygon", "Baxcalibur", "Annihilape", "Palafin",
      "Ceruledge", "Armarouge", "Tinkaton", "Grimmsnarl", "Toxtricity", "Dracovish", "Arctovish",
      "Aegislash", "Lucario", "Togekiss", "Gengar", "Alakazam", "Starmie", "Magnezone", "Scizor",
      "Blaziken", "Greninja", "Cinderace", "Rillaboom", "Inteleon", "Decidueye", "Primarina", "Incineroar",
      "Serperior", "Empoleon", "Infernape", "Sceptile", "Swampert", "Feraligatr", "Typhlosion",
      "Charizard", "Venusaur", "Blastoise", "Skeledirge", "Quaquaval", "Meowscarada", "Samurott-Hisui",
      "Zoroark-Hisui", "Lilligant-Hisui", "Arcanine-Hisui", "Electrode-Hisui", "Braviary-Hisui",
      "Goodra-Hisui", "Avalugg-Hisui", "Decidueye-Hisui", "Typhlosion-Hisui", "Samurott-Hisui"
    ],
    elite: [
      "Garchomp 6IV EV Max", "Dragapult 6IV EV Max", "Tyranitar 6IV EV Max", "Volcarona 6IV EV Max",
      "Salamence 6IV EV Max", "Metagross 6IV EV Max", "Hydreigon 6IV EV Max", "Kingambit 6IV EV Max",
      "Dragonite 6IV EV Max", "Kommo-o 6IV EV Max", "Baxcalibur 6IV EV Max", "Annihilape 6IV EV Max",
      "Palafin 6IV EV Max", "Aegislash 6IV EV Max", "Lucario 6IV EV Max", "Togekiss 6IV EV Max",
      "Blaziken 6IV EV Max", "Greninja 6IV EV Max", "Cinderace 6IV EV Max", "Scizor 6IV EV Max",
      "Gengar 6IV EV Max", "Alakazam 6IV EV Max", "Excadrill 6IV EV Max", "Ferrothorn 6IV EV Max"
    ],
    jackpot: ["Dragapult Shiny 6IV EV Max"],
  },
  shiny: {
    commun: [
      "Shiny Magikarp", "Shiny Ponyta", "Shiny Eevee", "Shiny Gastly", "Shiny Ralts", "Shiny Shinx", "Shiny Swablu",
      "Shiny Caterpie", "Shiny Pidgey", "Shiny Rattata", "Shiny Zubat", "Shiny Geodude", "Shiny Oddish",
      "Shiny Psyduck", "Shiny Poliwag", "Shiny Tentacool", "Shiny Shellder", "Shiny Krabby", "Shiny Cubone",
      "Shiny Goldeen", "Shiny Staryu", "Shiny Sentret", "Shiny Hoothoot", "Shiny Marill", "Shiny Wooper",
      "Shiny Murkrow", "Shiny Snubbull", "Shiny Slugma", "Shiny Swinub", "Shiny Houndour", "Shiny Poochyena",
      "Shiny Zigzagoon", "Shiny Lotad", "Shiny Seedot", "Shiny Wingull", "Shiny Shroomish", "Shiny Makuhita",
      "Shiny Electrike", "Shiny Numel", "Shiny Spoink", "Shiny Barboach", "Shiny Bidoof", "Shiny Starly",
      "Shiny Budew", "Shiny Buizel", "Shiny Buneary", "Shiny Lillipup", "Shiny Pidove", "Shiny Drilbur",
      "Shiny Cottonee", "Shiny Sandile", "Shiny Vanillite", "Shiny Deerling", "Shiny Joltik", "Shiny Litwick",
      "Shiny Cubchoo", "Shiny Fletchling", "Shiny Litleo", "Shiny Goomy", "Shiny Rockruff", "Shiny Wooloo",
      "Shiny Rookidee", "Shiny Yamper", "Shiny Applin", "Shiny Snom", "Shiny Hatenna", "Shiny Lechonk",
      "Shiny Pawmi", "Shiny Fidough", "Shiny Nacli", "Shiny Tandemaus", "Shiny Smoliv", "Shiny Capsakid"
    ],
    rare: [
      "Shiny Charizard", "Shiny Gardevoir", "Shiny Umbreon", "Shiny Milotic", "Shiny Ninetales", "Shiny Sylveon",
      "Shiny Arcanine", "Shiny Gyarados", "Shiny Lapras", "Shiny Vaporeon", "Shiny Jolteon", "Shiny Flareon",
      "Shiny Espeon", "Shiny Leafeon", "Shiny Glaceon", "Shiny Dragonair", "Shiny Scyther", "Shiny Steelix",
      "Shiny Houndoom", "Shiny Absol", "Shiny Flygon", "Shiny Altaria", "Shiny Aggron", "Shiny Roserade",
      "Shiny Luxray", "Shiny Honchkrow", "Shiny Mismagius", "Shiny Weavile", "Shiny Chandelure", "Shiny Zoroark",
      "Shiny Noivern", "Shiny Goodra", "Shiny Trevenant", "Shiny Aegislash", "Shiny Mimikyu", "Shiny Toxtricity",
      "Shiny Grimmsnarl", "Shiny Frosmoth", "Shiny Polteageist", "Shiny Ceruledge", "Shiny Armarouge",
      "Shiny Tinkaton", "Shiny Palafin", "Shiny Kilowattrel", "Shiny Baxcalibur", "Shiny Annihilape",
      "Shiny Venusaur", "Shiny Blastoise", "Shiny Typhlosion", "Shiny Feraligatr", "Shiny Sceptile",
      "Shiny Blaziken", "Shiny Swampert", "Shiny Torterra", "Shiny Infernape", "Shiny Empoleon",
      "Shiny Decidueye", "Shiny Incineroar", "Shiny Primarina", "Shiny Rillaboom", "Shiny Cinderace",
      "Shiny Inteleon", "Shiny Meowscarada", "Shiny Skeledirge", "Shiny Quaquaval"
    ],
    epique: [
      "Shiny Lucario", "Shiny Gengar", "Shiny Dragonite", "Shiny Metagross", "Shiny Garchomp",
      "Shiny Tyranitar", "Shiny Salamence", "Shiny Hydreigon", "Shiny Volcarona", "Shiny Kommo-o",
      "Shiny Dragapult", "Shiny Kingambit", "Shiny Haxorus", "Shiny Snorlax", "Shiny Togekiss",
      "Shiny Alakazam", "Shiny Machamp", "Shiny Blissey", "Shiny Porygon-Z", "Shiny Gallade",
      "Shiny Electivire", "Shiny Magmortar", "Shiny Gliscor", "Shiny Dusknoir", "Shiny Froslass",
      "Shiny Golisopod", "Shiny Greninja", "Shiny Scizor", "Shiny Magnezone", "Shiny Excadrill"
    ],
    jackpot: ["Shiny Rayquaza"],
  },
  legendaire: {
    semiLega: [
      "Articuno", "Zapdos", "Moltres", "Raikou", "Entei", "Suicune", "Regirock", "Regice", "Registeel",
      "Uxie", "Mesprit", "Azelf", "Heatran", "Regigigas", "Cresselia", "Cobalion", "Terrakion", "Virizion",
      "Tornadus", "Thundurus", "Landorus", "Type: Null", "Silvally", "Tapu Koko", "Tapu Lele", "Tapu Bulu",
      "Tapu Fini", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord",
      "Poipole", "Naganadel", "Stakataka", "Blacephalon", "Kubfu", "Urshifu", "Regieleki", "Regidrago",
      "Glastrier", "Spectrier", "Enamorus", "Wo-Chien", "Chien-Pao", "Ting-Lu", "Chi-Yu",
      "Articuno-Galar", "Zapdos-Galar", "Moltres-Galar", "Tornadus-Therian", "Thundurus-Therian", "Landorus-Therian"
    ],
    legendaire: [
      "Mewtwo", "Lugia", "Ho-Oh", "Kyogre", "Groudon", "Rayquaza", "Dialga", "Palkia", "Giratina",
      "Reshiram", "Zekrom", "Kyurem", "Xerneas", "Yveltal", "Zygarde", "Solgaleo", "Lunala", "Necrozma",
      "Zacian", "Zamazenta", "Eternatus", "Calyrex", "Koraidon", "Miraidon", "Terapagos", "Ogerpon",
      "Kyurem-White", "Kyurem-Black", "Necrozma-Dusk", "Necrozma-Dawn", "Calyrex-Ice", "Calyrex-Shadow",
      "Giratina-Origin", "Dialga-Origin", "Palkia-Origin"
    ],
    mythique: [
      "Mew", "Celebi", "Jirachi", "Deoxys", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus",
      "Victini", "Keldeo", "Meloetta", "Genesect", "Diancie", "Hoopa", "Volcanion", "Magearna",
      "Marshadow", "Zeraora", "Meltan", "Melmetal", "Zarude", "Pecharunt"
    ],
    jackpot: ["Mew Shiny 6IV"],
  },
};

const SHOP_FOSSILS: ShopProduct[] = [
  { id: "fossil-talent", name: "Fossile Talent Cache", tagline: "Deverrouille le potentiel cache", price: 3.99, color: "#2dd4bf", category: "fossile", items: ["Revele le talent cache de ton Pokemon", "Utilisable sur n'importe quel Pokemon", "Applique instantanement en jeu"], customImage: "/fossil-talent.webp" },
  { id: "fossil-shiny", name: "Fossile Shiny", tagline: "Rends-le chromatique", price: 4.99, color: "#f472b6", category: "fossile", items: ["Transforme ton Pokemon en shiny", "Fonctionne sur tous les Pokemon", "Garde les stats et mouvements"], badge: "Populaire", customImage: "/fossil-shiny.webp" },
  { id: "fossil-maxiv", name: "Fossile Max IV", tagline: "La perfection statistique", price: 3.99, color: "#60a5fa", category: "fossile", items: ["Passe les 6 IVs a 31 (parfaits)", "Ideal pour le PvP et les combats", "Compatible avec tous les Pokemon"], customImage: "/fossil-maxiv.webp" },
  { id: "fossil-parfait", name: "Fossile Parfait", tagline: "Le combo ultime tout-en-un", price: 9.99, color: "#fbbf24", category: "fossile", items: ["Talent Cache + Shiny + 6IV parfaits", "3 fossiles en 1 — economise 33%", "Le must-have pour ton Pokemon prefere"], badge: "Meilleure offre", customImage: "/fossil-parfait.webp" },
];

const SHOP_UPSELLS: ShopUpsell[] = [
  { id: "upsell-choose-pokemon", name: "Choisis ton Pokemon", price: 1.00, realPrice: 2.99, description: "Choisis ton Pokemon au lieu d'un aleatoire" },
  { id: "upsell-double-cd", name: "Double CobbleDollars", price: 1.49, realPrice: 1.99, description: "x2 les CobbleDollars du pack" },
  { id: "upsell-iv", name: "IV Parfaits", price: 1.99, realPrice: 5.99, description: "Ton Pokemon passe 6IV parfaits" },
  { id: "upsell-vip-extend", name: "VIP Etendu", price: 2.49, realPrice: 4.99, description: "Double la duree VIP du pack" },
  { id: "upsell-shiny", name: "Version Shiny", price: 2.99, realPrice: 9.99, description: "Ton Pokemon sera shiny (chromatique) garanti" },
  { id: "upsell-gacha5", name: "+5 Jetons Gacha", price: 3.99, realPrice: 7.99, description: "5 jetons gacha bonus" },
];

// Extraire le montant de CD d'un pack
function extractCdAmount(pack: ShopProduct): number {
  for (const item of pack.items) {
    const match = item.replace(/\s/g, "").match(/([\d]+)CobbleDollars/i);
    if (match) return parseInt(match[1]);
  }
  return 0;
}

// Extraire la durée VIP d'un pack
function extractVipDuration(pack: ShopProduct): string {
  if (!pack.vip || pack.vip === "Permanent") return "";
  return pack.vip;
}

const GRADE_THRESHOLDS = [
  { threshold: 10, grade: "Rival", color: "#4ade80" },
  { threshold: 25, grade: "Challenger", color: "#60a5fa" },
  { threshold: 50, grade: "Champion", color: "#fbbf24" },
  { threshold: 100, grade: "Maitre", color: "#ef4444" },
  { threshold: 200, grade: "Legende", color: "#a78bfa" },
  { threshold: 500, grade: "Mythique", color: "#22d3ee" },
  { threshold: 1000, grade: "Divin", color: "#f472b6" },
];

type ShopCartItem = {
  product: ShopProduct;
  upsells: ShopUpsell[];
  isDuplicate?: boolean; // 2ème exemplaire à -50%
  crossSellDiscount?: number; // réduction cross-sell en % (ex: 20 = -20%)
  chosenPokemon?: string; // Pokemon choisi si upsell "choose-pokemon" actif
};

type CrossSell = {
  product: ShopProduct;
  reason: string;
  discountPercent?: number; // réduction spéciale cross-sell
};

// Packs ordonnés par tier pour suggestions d'upgrade
const PACK_TIERS = ["pack-starter", "pack-combat", "pack-shiny", "pack-legendaire", "pack-legendaire-shiny"];

function getCrossSells(cart: ShopCartItem[]): CrossSell[] {
  const suggestions: CrossSell[] = [];
  const cartIds = new Set(cart.map((c) => c.product.id));
  const hasPack = cart.some((c) => c.product.category === "pack" && !["vip-trainer", "vip-plus"].includes(c.product.id));
  const hasCd = cart.some((c) => c.product.category === "cobbledollars");
  const hasGacha = cart.some((c) => c.product.category === "gacha");
  const hasVip = cart.some((c) => ["vip-trainer", "vip-plus"].includes(c.product.id));

  // Si pas de gacha → suggérer 5 jetons
  if (!hasGacha) {
    const gacha5 = SHOP_GACHA.find((p) => p.id === "gacha-5")!;
    if (!cartIds.has(gacha5.id)) {
      suggestions.push({ product: gacha5, reason: "Tente ta chance au Gacha !" });
    }
  }

  // Gros packs CD → suggérer un pack Pokemon à prix cassé
  const cdItems = cart.filter((c) => c.product.category === "cobbledollars");
  if (cdItems.length > 0 && !hasPack) {
    const maxCdId = cdItems.reduce((best, c) => c.product.price > best.product.price ? c : best).product.id;
    if (maxCdId === "cd-500000" || maxCdId === "cd-250000") {
      // 500k CD → Étoile Chromée à -50%, 250k → Pack Arène à -40%
      const packId = maxCdId === "cd-500000" ? "pack-shiny" : "pack-combat";
      const discount = maxCdId === "cd-500000" ? 50 : 40;
      const pack = SHOP_PRODUCTS.find((p) => p.id === packId)!;
      if (!cartIds.has(packId)) {
        suggestions.push({ product: pack, reason: "Ajoute un Pokemon a ton achat !", discountPercent: discount });
      }
    } else if (maxCdId === "cd-100000") {
      // 100k CD → Kit du Dresseur à -30%
      const starter = SHOP_PRODUCTS.find((p) => p.id === "pack-starter")!;
      if (!cartIds.has(starter.id)) {
        suggestions.push({ product: starter, reason: "Lance ton aventure avec un Pokemon", discountPercent: 30 });
      }
    }
  }

  // Gros packs Gacha → suggérer un pack Pokemon
  const gachaItems = cart.filter((c) => c.product.category === "gacha");
  if (gachaItems.length > 0 && !hasPack) {
    const maxGachaId = gachaItems.reduce((best, c) => c.product.price > best.product.price ? c : best).product.id;
    if ((maxGachaId === "gacha-50" || maxGachaId === "gacha-25") && !cdItems.length) {
      const pack = SHOP_PRODUCTS.find((p) => p.id === "pack-combat")!;
      if (!cartIds.has(pack.id)) {
        suggestions.push({ product: pack, reason: "Un Pokemon combat en bonus", discountPercent: 30 });
      }
    }
  }

  // Si pas de CD et pas de pack → suggérer 5000 CD
  if (!hasCd && !hasPack) {
    const cd5k = SHOP_CD.find((p) => p.id === "cd-5000")!;
    if (!cartIds.has(cd5k.id)) {
      suggestions.push({ product: cd5k, reason: "Demarre avec des CobbleDollars" });
    }
  }

  // Si a un pack → suggérer des CD en complement
  if (hasPack && !hasCd) {
    const cd15k = SHOP_CD.find((p) => p.id === "cd-15000")!;
    if (!cartIds.has(cd15k.id)) {
      suggestions.push({ product: cd15k, reason: "Complete ton pack avec des CD", discountPercent: 20 });
    }
  }

  // Si a un gros pack → suggérer un petit pack en plus
  const highPacks = cart.filter((c) => ["pack-shiny", "pack-legendaire", "pack-legendaire-shiny"].includes(c.product.id));
  if (highPacks.length > 0) {
    const starter = SHOP_PRODUCTS.find((p) => p.id === "pack-starter")!;
    if (!cartIds.has(starter.id)) {
      suggestions.push({ product: starter, reason: "Un 2eme Pokemon pour ton aventure", discountPercent: 30 });
    }
  }

  // Suggérer upgrade au tier suivant
  const packTierIndices = cart
    .filter((c) => PACK_TIERS.includes(c.product.id) && !c.isDuplicate)
    .map((c) => PACK_TIERS.indexOf(c.product.id));
  if (packTierIndices.length > 0) {
    const maxTier = Math.max(...packTierIndices);
    if (maxTier < PACK_TIERS.length - 1) {
      const nextPackId = PACK_TIERS[maxTier + 1];
      if (!cartIds.has(nextPackId)) {
        const nextPack = SHOP_PRODUCTS.find((p) => p.id === nextPackId)!;
        const currentPack = SHOP_PRODUCTS.find((p) => p.id === PACK_TIERS[maxTier])!;
        const diff = nextPack.price - currentPack.price;
        suggestions.push({ product: nextPack, reason: `Upgrade pour seulement +${diff.toFixed(2)}\u20AC de plus` });
      }
    }
  }

  // Si a du VIP mais pas de pack
  if (hasVip && !hasPack) {
    const starter = SHOP_PRODUCTS.find((p) => p.id === "pack-starter")!;
    if (!cartIds.has(starter.id)) {
      suggestions.push({ product: starter, reason: "Profite de ton VIP avec un pack", discountPercent: 15 });
    }
  }

  // Max 3 suggestions, pas de doublons
  const seen = new Set<string>();
  return suggestions.filter((s) => {
    if (seen.has(s.product.id)) return false;
    seen.add(s.product.id);
    return true;
  }).slice(0, 3);
}

const NO_UPSELL_PACKS = new Set(["vip-trainer", "vip-plus"]);

const POKEMON_UPSELLS = new Set(["upsell-choose-pokemon", "upsell-iv", "upsell-shiny"]);

function getUpsellsForPack(pack: ShopProduct): ShopUpsell[] {
  if (NO_UPSELL_PACKS.has(pack.id)) return [];
  if (pack.category !== "pack") return [];

  const hasCd = pack.items.some((i) => i.includes("CobbleDollars"));
  const hasVip = pack.vip && pack.vip !== "Permanent";
  const hasPokemon = !!pack.pokemonPool;
  const alreadyShiny = pack.id === "pack-shiny" || pack.id === "pack-legendaire" || pack.id === "pack-legendaire-shiny";
  const cdAmount = extractCdAmount(pack);
  const vipDuration = extractVipDuration(pack);

  return SHOP_UPSELLS.filter((u) => {
    if (u.id === "upsell-double-cd" && !hasCd) return false;
    if (u.id === "upsell-vip-extend" && !hasVip) return false;
    if (POKEMON_UPSELLS.has(u.id) && !hasPokemon) return false;
    if (u.id === "upsell-shiny" && alreadyShiny) return false;
    return true;
  }).map((u) => {
    if (u.id === "upsell-choose-pokemon" && pack.choosePrice) {
      return { ...u, price: pack.choosePrice, realPrice: pack.choosePrice * 3 };
    }
    if (u.id === "upsell-double-cd" && cdAmount > 0) {
      const formatted = cdAmount.toLocaleString("fr-FR");
      return { ...u, description: `Passe de ${formatted} a ${(cdAmount * 2).toLocaleString("fr-FR")} CD (+${formatted})` };
    }
    if (u.id === "upsell-vip-extend" && vipDuration) {
      return { ...u, description: `Passe de ${vipDuration} a ${doubleVipDuration(vipDuration)} de VIP` };
    }
    if (u.id === "upsell-shiny") {
      return { ...u, description: "Ton Pokemon sera chromatique (shiny) garanti !" };
    }
    return u;
  });
}

function doubleVipDuration(duration: string): string {
  const match = duration.match(/(\d+)/);
  if (!match) return duration;
  const days = parseInt(match[1]) * 2;
  return `${days} jours`;
}

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
const DISCORD_SERVER_ID = "1423492671351296092";

function ServerStatus() {
  const [online, setOnline] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/status`);
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

const LAUNCHER_URL = "https://github.com/Loukoulele/cobblenite-launcher/releases/download/v1.5.0/Cobblenite-Launcher-setup-1.5.0.exe";
const LAUNCHER_MAC_URL = "https://github.com/Loukoulele/cobblenite-launcher/releases/download/v1.5.0/Cobblenite-Launcher-1.5.0-x64.dmg";
const LAUNCHER_LINUX_URL = "https://github.com/Loukoulele/cobblenite-launcher/releases/download/v1.5.0/Cobblenite-Launcher-1.5.0.AppImage";

const NAV_ITEMS = [
  { id: "hero", label: "Cobblenite", href: "#" },
  { id: "presentation", label: "Le serveur", href: "#presentation" },
  { id: "rejoindre", label: "Rejoindre", href: "#rejoindre" },
  { id: "boutique", label: "Boutique", href: "#boutique" },
  { id: "votes", label: "Votes", href: "/votes" },
  { id: "wiki", label: "Wiki", href: "#wiki" },
  { id: "discord", label: "Discord", href: "#discord" },
];


function ShopPackCard({ product, onAdd }: { product: ShopProduct; onAdd: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [poolExpanded, setPoolExpanded] = useState(false);
  const MAX_VISIBLE = 5;
  const POOL_PREVIEW = 10;
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
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-60" style={{ background: `${product.color}15` }} />

      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
            style={{ color: product.color, borderColor: `${product.color}40`, background: `${product.color}15` }}>
            {product.badge}
          </span>
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {product.vip && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-200 text-[10px] font-bold">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              VIP {product.vip}
            </span>
          </div>
        )}

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

        <h3 className="text-lg font-bold text-white text-center">{product.name}</h3>
        {product.tagline && (
          <p className="text-white/30 text-xs text-center mb-2">{product.tagline}</p>
        )}

        <div className="text-center mb-3">
          {product.oldPrice && (
            <span className="text-white/30 text-sm line-through mr-2">{product.oldPrice.toFixed(2)}&euro;</span>
          )}
          <span className="text-xl font-bold" style={{ color: product.color }}>
            {product.price.toFixed(2)}&euro;
          </span>
        </div>

        <div className="space-y-1.5 mb-4 flex-1">
          {visibleItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-sm text-white/60">
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

        {/* Pokemon pool */}
        {product.pokemonPool && product.pokemonPool.length > 0 && (
          <div className="mb-4">
            <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2 font-medium text-center">
              Pokemon obtenables ({product.pokemonPool.length}{product.poolHidden ? `+${product.poolHidden}` : ""})
            </p>
            <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 px-2">
              {(poolExpanded ? product.pokemonPool : product.pokemonPool.slice(0, POOL_PREVIEW)).map((p, i, arr) => (
                <span key={i} className="text-white/40 text-xs">
                  {p.name}{i < arr.length - 1 || (!poolExpanded && product.pokemonPool!.length > POOL_PREVIEW) || product.poolHidden ? "," : ""}
                </span>
              ))}
              {!poolExpanded && product.pokemonPool.length > POOL_PREVIEW && (
                <button
                  onClick={(e) => { e.stopPropagation(); setPoolExpanded(true); }}
                  className="text-xs font-medium cursor-pointer transition-colors"
                  style={{ color: product.color }}
                >
                  +{product.pokemonPool.length - POOL_PREVIEW} autres...
                </button>
              )}
              {poolExpanded && product.poolHidden && (
                <span className="text-white/25 text-xs italic">et {product.poolHidden}+ autres...</span>
              )}
            </div>
            {poolExpanded && product.pokemonPool.length > POOL_PREVIEW && (
              <button
                onClick={(e) => { e.stopPropagation(); setPoolExpanded(false); }}
                className="w-full text-center mt-1 text-[10px] font-medium cursor-pointer transition-colors text-white/30"
              >
                Reduire
              </button>
            )}
            {product.choosePrice && (
              <p className="text-white/20 text-[9px] text-center mt-1.5">+{product.choosePrice}&euro; pour choisir ton Pokemon</p>
            )}
          </div>
        )}

        <button
          onClick={onAdd}
          className="w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer hover:scale-[1.02]"
          style={{ color: "white", borderColor: `${product.color}40`, background: `${product.color}20` }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

// Taille d'image progressive selon le tier du produit
const IMAGE_SIZES: Record<string, string> = {
  "cd-5000": "w-12 h-12", "cd-15000": "w-14 h-14", "cd-50000": "w-16 h-16",
  "cd-100000": "w-20 h-20", "cd-250000": "w-24 h-24", "cd-500000": "w-28 h-28",
  "gacha-1": "w-12 h-12", "gacha-5": "w-14 h-14", "gacha-10": "w-18 h-18",
  "gacha-25": "w-26 h-26", "gacha-50": "w-28 h-28",
  "fossil-talent": "w-18 h-18", "fossil-shiny": "w-18 h-18",
  "fossil-maxiv": "w-20 h-20", "fossil-parfait": "w-24 h-24",
};

function ShopCurrencyCard({ product, onAdd }: { product: ShopProduct; onAdd: () => void }) {
  const isCd = product.category === "cobbledollars";
  const icon = isCd ? "\uD83E\uDE99" : "\uD83C\uDFB0";
  const imgSize = IMAGE_SIZES[product.id] || "w-16 h-16";

  return (
    <div
      className="relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-300 group p-4 flex flex-col items-center text-center"
      style={{ borderColor: `${product.color}20`, background: `linear-gradient(160deg, ${product.color}08 0%, transparent 60%)` }}
    >
      {/* Badge au-dessus de l'image */}
      {product.badge ? (
        <span className="mb-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border"
          style={{ color: product.color, borderColor: `${product.color}40`, background: `${product.color}15` }}>
          {product.badge}
        </span>
      ) : (
        <div className="h-5" />
      )}
      {/* Image zone — hauteur fixe, contenue, pas de débordement */}
      <div className="flex items-end justify-center h-28 mb-2 overflow-hidden">
        {product.customImage ? (
          <img src={product.customImage} alt={product.name} className={`${imgSize} object-contain drop-shadow-lg`} />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
      </div>
      {/* Nom + Tagline — hauteur fixe pour alignement */}
      <div className="min-h-[48px] flex flex-col justify-center">
        <h3 className="text-base font-bold text-white leading-tight">{product.name}</h3>
        {product.tagline && (
          <p className="text-white/30 text-[11px] mt-1 leading-snug">{product.tagline}</p>
        )}
      </div>
      {/* Discount badge or spacer for alignment */}
      {product.discount ? (
        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ color: product.color, background: `${product.color}15` }}>
          {product.discount}
        </span>
      ) : (
        <div className="mt-1.5 h-[18px]" />
      )}
      {/* Items description — centré */}
      {product.items.length > 0 && (
        <div className="mt-3 w-full space-y-1.5">
          {product.items.map((item, i) => (
            <p key={i} className="text-[11px] text-white/40 leading-snug text-center">{item}</p>
          ))}
        </div>
      )}
      {/* Separator */}
      <div className="w-8 h-px mx-auto mt-3 mb-2" style={{ background: `${product.color}20` }} />
      {/* Prix */}
      <div className="mb-3 flex-1 flex items-end justify-center">
        <span className="text-xl font-bold" style={{ color: product.color }}>
          {product.price.toFixed(2)}&euro;
        </span>
      </div>
      {/* Bouton */}
      <button
        onClick={onAdd}
        className="w-full px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer hover:scale-[1.02]"
        style={{ color: "white", borderColor: `${product.color}30`, background: `${product.color}15` }}
      >
        Ajouter
      </button>
    </div>
  );
}

function BoutiqueSection() {
  const [tab, setTab] = useState<"packs" | "cobbledollars" | "gacha" | "fossiles">("packs");
  const [expandedPools, setExpandedPools] = useState<Set<string>>(new Set());
  const togglePool = (key: string) => setExpandedPools((prev) => { const next = new Set(prev); next.has(key) ? next.delete(key) : next.add(key); return next; });
  const [cart, setCart] = useState<ShopCartItem[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [playerNameSet, setPlayerNameSet] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gradeUpsell, setGradeUpsell] = useState<{ grade: string; color: string; amountNeeded: number } | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState<{ code: string; percentOff: number | null; amountOff: number | null; name: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [anonymousMode, setAnonymousMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cobblenite_player");
    if (saved) { setPlayerName(saved); setPlayerNameSet(true); }
  }, []);

  useEffect(() => {
    if (playerNameSet && playerName) localStorage.setItem("cobblenite_player", playerName);
  }, [playerNameSet, playerName]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cobblenite_cart");
    if (savedCart) { try { const parsed = JSON.parse(savedCart) as ShopCartItem[]; if (parsed.length > 0) setCart(parsed); } catch { /* ignore */ } }
  }, []);

  useEffect(() => { localStorage.setItem("cobblenite_cart", JSON.stringify(cart)); }, [cart]);

  const getItemPrice = (item: ShopCartItem) => {
    let packPrice = item.product.price;
    if (item.isDuplicate) packPrice = Math.round(packPrice * 50) / 100;
    if (item.crossSellDiscount) packPrice = Math.round(packPrice * (100 - item.crossSellDiscount)) / 100;
    return packPrice + item.upsells.reduce((s, u) => s + u.price, 0);
  };
  const cartTotal = cart.reduce((sum, item) => sum + getItemPrice(item), 0);
  const promoDiscount = promoApplied
    ? promoApplied.percentOff
      ? Math.round(cartTotal * promoApplied.percentOff) / 100
      : promoApplied.amountOff
        ? Math.min(promoApplied.amountOff, cartTotal)
        : 0
    : 0;
  const cartFinal = Math.max(0, cartTotal - promoDiscount);
  const cartItemCount = cart.reduce((sum, item) => sum + 1 + item.upsells.length, 0);
  const crossSells = getCrossSells(cart);

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true); setPromoError("");
    try {
      const res = await fetch("/api/promo", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (data.valid) {
        setPromoApplied({ code: data.code, percentOff: data.percentOff, amountOff: data.amountOff, name: data.name });
        setPromoError("");
      } else {
        setPromoError("Code invalide ou expire");
        setPromoApplied(null);
      }
    } catch { setPromoError("Erreur de verification"); }
    finally { setPromoLoading(false); }
  };

  useEffect(() => {
    if (!playerNameSet || !playerName) return;
    const checkGrade = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://5.9.102.58"}/api/player-balance`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ player_name: playerName }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.next_grade && data.amount_needed > 0 && data.amount_needed <= 20) {
          const gradeInfo = GRADE_THRESHOLDS.find((g) => g.grade.toLowerCase() === data.next_grade);
          if (gradeInfo) setGradeUpsell({ grade: gradeInfo.grade, color: gradeInfo.color, amountNeeded: data.amount_needed });
          else setGradeUpsell(null);
        } else setGradeUpsell(null);
      } catch { /* Silent */ }
    };
    checkGrade();
  }, [playerNameSet, playerName, cartTotal]);

  const addToCart = (product: ShopProduct) => { setCart((prev) => [...prev, { product, upsells: [] }]); };
  const addCrossSell = (crossSell: CrossSell) => {
    setCart((prev) => [...prev, { product: crossSell.product, upsells: [], crossSellDiscount: crossSell.discountPercent }]);
  };
  const addUpsell = (cartIndex: number, upsell: ShopUpsell) => {
    setCart((prev) => prev.map((item, i) => {
      if (i !== cartIndex) return item;
      if (item.upsells.some((u) => u.id === upsell.id)) return item;
      let newUpsells = [...item.upsells, upsell];
      // IV Parfaits requires Choisis ton Pokemon — auto-add it
      if (upsell.id === "upsell-iv" && !item.upsells.some((u) => u.id === "upsell-choose-pokemon")) {
        const choosePokemon = getUpsellsForPack(item.product).find((u) => u.id === "upsell-choose-pokemon");
        if (choosePokemon) newUpsells = [choosePokemon, ...newUpsells];
      }
      return { ...item, upsells: newUpsells };
    }));
  };
  const removeUpsell = (cartIndex: number, upsellId: string) => {
    setCart((prev) => prev.map((item, i) => {
      if (i !== cartIndex) return item;
      let upsellsToRemove = [upsellId];
      // Removing choose-pokemon also removes IV (IV requires choose-pokemon)
      if (upsellId === "upsell-choose-pokemon") upsellsToRemove.push("upsell-iv");
      const updated = { ...item, upsells: item.upsells.filter((u) => !upsellsToRemove.includes(u.id)) };
      // Clear chosen pokemon if removing the choose upsell
      if (upsellId === "upsell-choose-pokemon") updated.chosenPokemon = undefined;
      return updated;
    }));
  };
  const setChosenPokemon = (cartIndex: number, pokemon: string) => {
    setCart((prev) => prev.map((item, i) => {
      if (i !== cartIndex) return item;
      return { ...item, chosenPokemon: pokemon };
    }));
  };
  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const removed = prev[index];
      // If removing the original, also remove its duplicate
      if (removed && !removed.isDuplicate) {
        return prev.filter((item, i) => i !== index && !(item.isDuplicate && item.product.id === removed.product.id));
      }
      return prev.filter((_, i) => i !== index);
    });
  };
  const duplicatePack = (index: number) => {
    const original = cart[index];
    if (!original || original.isDuplicate) return;
    // Check if there's already a duplicate of this pack
    if (cart.some((item) => item.isDuplicate && item.product.id === original.product.id)) return;
    const duplicate: ShopCartItem = { product: original.product, upsells: [], isDuplicate: true };
    setCart((prev) => {
      const next = [...prev];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
  };

  const handleCheckout = async () => {
    if (!playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) { setError("Pseudo Minecraft invalide (3-16 caracteres, lettres/chiffres/underscore)"); return; }
    if (cart.length === 0) { setError("Ton panier est vide !"); return; }
    // Check that all "choose pokemon" upsells have a selection
    const missingChoice = cart.find((item) => item.upsells.some((u) => u.id === "upsell-choose-pokemon") && !item.chosenPokemon);
    if (missingChoice) { setError(`Choisis un Pokemon pour "${missingChoice.product.name}"`); return; }
    setLoading(true); setError("");
    try {
      const items = cart.map((item) => ({
        packId: item.product.id,
        upsells: item.upsells.map((u) => u.id),
        chosenPokemon: item.chosenPokemon || null,
        isDuplicate: item.isDuplicate || false,
        crossSellDiscount: item.crossSellDiscount || 0,
      }));
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, playerName, promoCode: promoApplied?.code || "", anonymousMode }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Erreur lors du paiement");
    } catch { setError("Erreur de connexion"); }
    finally { setLoading(false); }
  };

  return (
    <section id="boutique" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium text-center">Shop</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Boutique</h2>
        <p className="text-white/40 mb-8 text-center">Packs exclusifs, CobbleDollars, Jetons Gacha et Fossiles</p>

        {/* ── Rewards Reel ── */}
        <GachaReel />


        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit mx-auto mb-8">
          {[
            { key: "packs" as const, label: "Packs" },
            { key: "cobbledollars" as const, label: "CobbleDollars" },
            { key: "gacha" as const, label: "Jetons Gacha" },
            { key: "fossiles" as const, label: "Fossiles" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                tab === t.key ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Products ── */}
        {tab === "packs" && (
          <>
            {/* Pass VIP section */}
            <div className="mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-purple-500/30" />
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-purple-300 bg-purple-500/10 border border-purple-500/20">
                  Pass VIP
                </span>
                <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-purple-500/30" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {SHOP_PRODUCTS.filter((p) => p.id === "vip-trainer" || p.id === "vip-plus").map((pack) => (
                  <ShopPackCard key={pack.id} product={pack} onAdd={() => addToCart(pack)} />
                ))}
              </div>
            </div>

            {/* Packs section */}
            <div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-white/10" />
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white/50 bg-white/5 border border-white/10">
                  Packs
                </span>
                <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-white/10" />
              </div>
              {(() => {
                const packs = SHOP_PRODUCTS.filter((p) => p.id !== "vip-trainer" && p.id !== "vip-plus");
                const topRow = packs.slice(0, 3);
                const bottomRow = packs.slice(3);
                return (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {topRow.map((pack) => (
                        <ShopPackCard key={pack.id} product={pack} onAdd={() => addToCart(pack)} />
                      ))}
                    </div>
                    {bottomRow.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
                        {bottomRow.map((pack) => (
                          <ShopPackCard key={pack.id} product={pack} onAdd={() => addToCart(pack)} />
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </>
        )}

        {tab === "cobbledollars" && (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">CobbleDollars</h3>
              <p className="text-white/30 text-sm">Monnaie in-game, plus t&apos;achetes plus c&apos;est rentable</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {SHOP_CD.map((cd) => (
                <ShopCurrencyCard key={cd.id} product={cd} onAdd={() => addToCart(cd)} />
              ))}
            </div>
          </>
        )}

        {tab === "gacha" && (
          <>
            {/* ── Titre + Acheter des jetons EN PREMIER ── */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">Jetons Gacha</h3>
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                Achete des jetons et utilise-les dans les 4 machines gacha du serveur. Chaque machine a son propre pool et son jackpot ultra-rare !
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {SHOP_GACHA.map((token) => (
                <ShopCurrencyCard key={token.id} product={token} onAdd={() => addToCart(token)} />
              ))}
            </div>

            {/* ── Les 4 Machines ── */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-purple-500/30" />
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-purple-300 bg-purple-500/10 border border-purple-500/20">
                4 Machines disponibles en jeu
              </span>
              <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-purple-500/30" />
            </div>
            <p className="text-center text-white/30 text-xs mb-6">Systeme de pity : jackpot garanti au bout de 100 pulls sur chaque machine</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { key: "sauvage", name: "Rencontre Sauvage", cost: "1 jeton / pull", color: "emerald", img: "/banner-sauvage.webp", pity: "Epique a 20 pulls", pool: GACHA_POOLS.sauvage, tiers: [
                  { label: "Commun", rate: "70%", dotColor: "bg-white/40", textColor: "text-white/50", rateColor: "text-white/25", data: GACHA_POOLS.sauvage.commun },
                  { label: "Rare", rate: "25%", dotColor: "bg-blue-400", textColor: "text-blue-300", rateColor: "text-blue-300/40", data: GACHA_POOLS.sauvage.rare },
                  { label: "Epique", rate: "4.5%", dotColor: "bg-purple-400", textColor: "text-purple-300", rateColor: "text-purple-300/40", data: GACHA_POOLS.sauvage.epique },
                ], jackpotRate: "0.5%", jackpotName: GACHA_POOLS.sauvage.jackpot[0] },
                { key: "combat", name: "Arene des Champions", cost: "2 jetons / pull", color: "red", img: "/banner-combat.webp", pity: "Elite a 15 pulls", pool: GACHA_POOLS.combat, tiers: [
                  { label: "Bon", rate: "60%", dotColor: "bg-white/40", textColor: "text-white/50", rateColor: "text-white/25", data: GACHA_POOLS.combat.bon },
                  { label: "Tres bon", rate: "30%", dotColor: "bg-blue-400", textColor: "text-blue-300", rateColor: "text-blue-300/40", data: GACHA_POOLS.combat.tresBon },
                  { label: "Elite", rate: "9.7%", dotColor: "bg-purple-400", textColor: "text-purple-300", rateColor: "text-purple-300/40", data: GACHA_POOLS.combat.elite },
                ], jackpotRate: "0.3%", jackpotName: GACHA_POOLS.combat.jackpot[0] },
                { key: "shiny", name: "Etoiles Chromees", cost: "3 jetons / pull", color: "pink", img: "/banner-shiny.webp", pity: "Shiny epique a 10 pulls", pool: GACHA_POOLS.shiny, tiers: [
                  { label: "Shiny commun", rate: "50%", dotColor: "bg-white/40", textColor: "text-white/50", rateColor: "text-white/25", data: GACHA_POOLS.shiny.commun },
                  { label: "Shiny rare", rate: "35%", dotColor: "bg-blue-400", textColor: "text-blue-300", rateColor: "text-blue-300/40", data: GACHA_POOLS.shiny.rare },
                  { label: "Shiny epique", rate: "14.7%", dotColor: "bg-purple-400", textColor: "text-purple-300", rateColor: "text-purple-300/40", data: GACHA_POOLS.shiny.epique },
                ], jackpotRate: "0.3%", jackpotName: GACHA_POOLS.shiny.jackpot[0] },
              ].map((banner) => (
                <div key={banner.key} className={`rounded-xl border border-${banner.color}-500/20 bg-gradient-to-br from-${banner.color}-500/8 to-transparent p-5 relative overflow-hidden group hover:border-${banner.color}-500/40 transition-all`}>
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-${banner.color}-500/5 rounded-full blur-3xl -translate-y-10 translate-x-10`} />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-${banner.color}-500/10 border border-${banner.color}-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                        <img src={banner.img} alt={banner.name} className="w-14 h-14 object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-base mb-0.5">{banner.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-${banner.color}-500/15 text-${banner.color}-400 border border-${banner.color}-500/20`}>{banner.cost}</span>
                      </div>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      {banner.tiers.map((tier) => {
                        const poolKey = `${banner.key}-${tier.label}`;
                        const isExpanded = expandedPools.has(poolKey);
                        const preview = tier.data.slice(0, 5).join(", ");
                        return (
                          <div key={tier.label}>
                            <button onClick={() => togglePool(poolKey)} className="flex items-center gap-2 mb-1 w-full text-left cursor-pointer group/tier">
                              <span className={`w-1.5 h-1.5 rounded-full ${tier.dotColor} flex-shrink-0`} />
                              <span className={tier.textColor}>{tier.label} <span className={tier.rateColor}>({tier.rate})</span></span>
                              <span className="text-white/20 ml-auto text-[10px]">{tier.data.length} Pokemon {isExpanded ? "▲" : "▼"}</span>
                            </button>
                            {isExpanded ? (
                              <p className="text-white/30 pl-3.5 leading-relaxed max-h-32 overflow-y-auto text-[11px]">{tier.data.join(", ")}</p>
                            ) : (
                              <p className="text-white/25 pl-3.5 text-[11px]">{preview}... <span className="text-white/15">+{tier.data.length - 5}</span></p>
                            )}
                          </div>
                        );
                      })}
                      <div className="py-1.5 px-2 -mx-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 animate-pulse" /><span className="text-yellow-300 font-bold">Jackpot <span className="text-yellow-300/40">({banner.jackpotRate})</span></span><span className="text-yellow-300 font-bold ml-auto">{banner.jackpotName}</span></div>
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] text-white/20">Pity : {banner.pity} &bull; Jackpot a 100 pulls</div>
                  </div>
                </div>
              ))}

              {/* Bannière Mythes & Légendes */}
              <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/8 to-transparent p-5 relative overflow-hidden group hover:border-yellow-500/40 transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl -translate-y-10 translate-x-10" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src="/banner-legendaire.webp" alt="Mythes et Legendes" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-base mb-0.5">Mythes &amp; Legendes</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">5 jetons / pull</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { label: "Semi-legendaire", rate: "70%", dotColor: "bg-white/40", textColor: "text-white/50", rateColor: "text-white/25", data: GACHA_POOLS.legendaire.semiLega },
                      { label: "Legendaire", rate: "25%", dotColor: "bg-blue-400", textColor: "text-blue-300", rateColor: "text-blue-300/40", data: GACHA_POOLS.legendaire.legendaire },
                      { label: "Mythique", rate: "4.9%", dotColor: "bg-purple-400", textColor: "text-purple-300", rateColor: "text-purple-300/40", data: GACHA_POOLS.legendaire.mythique },
                    ].map((tier) => {
                      const poolKey = `legendaire-${tier.label}`;
                      const isExpanded = expandedPools.has(poolKey);
                      const preview = tier.data.slice(0, 5).join(", ");
                      return (
                        <div key={tier.label}>
                          <button onClick={() => togglePool(poolKey)} className="flex items-center gap-2 mb-1 w-full text-left cursor-pointer">
                            <span className={`w-1.5 h-1.5 rounded-full ${tier.dotColor} flex-shrink-0`} />
                            <span className={tier.textColor}>{tier.label} <span className={tier.rateColor}>({tier.rate})</span></span>
                            <span className="text-white/20 ml-auto text-[10px]">{tier.data.length} Pokemon {isExpanded ? "▲" : "▼"}</span>
                          </button>
                          {isExpanded ? (
                            <p className="text-white/30 pl-3.5 leading-relaxed max-h-32 overflow-y-auto text-[11px]">{tier.data.join(", ")}</p>
                          ) : (
                            <p className="text-white/25 pl-3.5 text-[11px]">{preview}... <span className="text-white/15">+{tier.data.length - 5}</span></p>
                          )}
                        </div>
                      );
                    })}
                    <div className="py-1.5 px-2 -mx-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 animate-pulse" /><span className="text-yellow-300 font-bold">Jackpot <span className="text-yellow-300/40">(0.1%)</span></span><span className="text-yellow-300 font-bold ml-auto">Mew Shiny 6IV</span></div>
                    </div>
                  </div>
                  <div className="mt-3 text-[10px] text-white/20">Pity : Legendaire a 10 pulls &bull; Jackpot a 100 pulls</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "fossiles" && (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">Fossiles</h3>
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                Ameliore tes Pokemon existants ! Utilise un fossile sur n&apos;importe quel Pokemon de ton equipe pour debloquer son plein potentiel.
              </p>
            </div>
            <div className="flex justify-center gap-6 mb-6 text-xs text-white/30">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400" /> Talent Cache</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-400" /> Shiny</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> IV Parfaits</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {SHOP_FOSSILS.map((fossil) => (
                <ShopCurrencyCard key={fossil.id} product={fossil} onAdd={() => addToCart(fossil)} />
              ))}
            </div>
            {/* Info Fossile Parfait */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs">
                <span className="font-bold">Fossile Parfait</span>
                <span className="text-yellow-300/60">=</span>
                <span>Talent Cache + Shiny + Max IV</span>
                <span className="text-yellow-300/60">|</span>
                <span className="font-bold">Economise 2.98&euro;</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating cart bar */}
      {cart.length > 0 && !showCheckout && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-white">
              <span className="text-sm text-white/50">{cartItemCount} article{cartItemCount > 1 ? "s" : ""}</span>
              <span className="mx-3 text-white/20">|</span>
              <span className="text-lg font-bold">{cartFinal.toFixed(2)}&euro;</span>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Ton panier</h2>
                <button onClick={() => setShowCheckout(false)} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>

              {playerNameSet ? (
                <div className="flex items-center gap-3 mb-6 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
                  <img src={`https://mc-heads.net/avatar/${playerName}/32`} alt={playerName} className="w-8 h-8 rounded" />
                  <span className="text-white font-medium">{playerName}</span>
                  <button onClick={() => { setPlayerNameSet(false); }} className="ml-auto text-white/20 hover:text-white/50 text-xs underline cursor-pointer">changer</button>
                </div>
              ) : (
                <div className="mb-6 p-3 bg-white/5 rounded-xl border border-purple-500/20">
                  <p className="text-white/40 text-xs mb-2">Entre ton pseudo Minecraft pour payer</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) setPlayerNameSet(true); }}
                      placeholder="Pseudo..."
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
                      maxLength={16}
                    />
                    <button
                      onClick={() => { if (playerName.match(/^[a-zA-Z0-9_]{3,16}$/)) setPlayerNameSet(true); }}
                      disabled={!playerName.match(/^[a-zA-Z0-9_]{3,16}$/)}
                      className="px-4 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-purple-600 text-white hover:bg-purple-500"
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}

              {cart.length === 0 ? (
                <p className="text-white/30 text-center py-8">Ton panier est vide</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {(() => {
                    // Group simple items (no upsells possible) by product id
                    const simpleCategories = new Set(["cobbledollars", "gacha", "fossile"]);
                    const grouped: { id: string; product: ShopProduct; indices: number[] }[] = [];
                    const complexItems: { item: ShopCartItem; index: number }[] = [];

                    cart.forEach((item, i) => {
                      if (simpleCategories.has(item.product.category) && !item.isDuplicate && !item.crossSellDiscount) {
                        const existing = grouped.find((g) => g.id === item.product.id);
                        if (existing) {
                          existing.indices.push(i);
                        } else {
                          grouped.push({ id: item.product.id, product: item.product, indices: [i] });
                        }
                      } else {
                        complexItems.push({ item, index: i });
                      }
                    });

                    return (
                      <>
                        {/* Grouped simple items with quantity controls */}
                        {grouped.map((group) => {
                          const qty = group.indices.length;
                          const lineTotal = group.product.price * qty;
                          return (
                            <div key={group.id} className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.008)" }}>
                              <div className="flex items-center justify-between px-3 py-2.5">
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-sm font-medium truncate">{group.product.name}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  {/* Quantity controls */}
                                  <div className="flex items-center gap-0 border border-white/10 rounded-lg overflow-hidden">
                                    <button
                                      onClick={() => {
                                        // Remove last occurrence
                                        const lastIdx = group.indices[group.indices.length - 1];
                                        removeFromCart(lastIdx);
                                      }}
                                      className="px-2 py-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-sm font-medium"
                                    >
                                      &minus;
                                    </button>
                                    <span className="px-2.5 py-1 text-white text-sm font-bold min-w-[32px] text-center bg-white/5">{qty}</span>
                                    <button
                                      onClick={() => addToCart(group.product)}
                                      className="px-2 py-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-sm font-medium"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span className="text-white/60 text-sm min-w-[60px] text-right">{lineTotal.toFixed(2)}&euro;</span>
                                  <button onClick={() => {
                                    // Remove all occurrences (from last to first to preserve indices)
                                    const indicesToRemove = [...group.indices].sort((a, b) => b - a);
                                    setCart((prev) => prev.filter((_, i) => !indicesToRemove.includes(i)));
                                  }} className="text-white/20 hover:text-red-400 transition-colors cursor-pointer">
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Complex items (packs with upsells) — unchanged */}
                        {complexItems.map(({ item, index: i }) => {
                          const packUpsells = getUpsellsForPack(item.product);
                          const availableUpsells = packUpsells.filter((u) => !item.upsells.some((eu) => eu.id === u.id));
                          const packPrice = item.isDuplicate ? Math.round(item.product.price * 50) / 100 : (item.crossSellDiscount ? Math.round(item.product.price * (100 - item.crossSellDiscount)) / 100 : item.product.price);
                          const packSubtotal = packPrice + item.upsells.reduce((s, u) => s + u.price, 0);
                          const hasDuplicate = cart.some((c, j) => j !== i && c.product.id === item.product.id && c.isDuplicate);
                          const canDuplicate = !item.isDuplicate && !hasDuplicate && !NO_UPSELL_PACKS.has(item.product.id) && item.product.category === "pack";
                          return (
                            <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: item.isDuplicate ? `${item.product.color}30` : "rgba(255,255,255,0.05)", background: item.isDuplicate ? `${item.product.color}08` : "rgba(255,255,255,0.008)" }}>
                              {/* Pack header */}
                              <div className="flex items-center justify-between px-3 py-2.5">
                                <div className="flex-1 min-w-0 flex items-center gap-2">
                                  <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                                  {item.isDuplicate && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-500/15 text-green-400 border border-green-500/20 whitespace-nowrap">x2 -50%</span>
                                  )}
                                  {item.crossSellDiscount && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/20 whitespace-nowrap">-{item.crossSellDiscount}%</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  {(item.isDuplicate || item.crossSellDiscount) && (
                                    <span className="text-white/30 text-xs line-through">{item.product.price.toFixed(2)}&euro;</span>
                                  )}
                                  <span className="text-white/60 text-sm">{packSubtotal.toFixed(2)}&euro;</span>
                                  <button onClick={() => removeFromCart(i)} className="text-white/20 hover:text-red-400 transition-colors cursor-pointer">
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                  </button>
                                </div>
                              </div>

                              {/* Active upsells for this pack */}
                              {item.upsells.length > 0 && (
                                <div className="px-3 pb-1">
                                  {item.upsells.map((u) => (
                                    <div key={u.id}>
                                      <div className="flex items-center justify-between py-1 pl-4 border-l-2 border-purple-500/30 ml-1">
                                        <div className="flex-1 min-w-0">
                                          <p className="text-purple-300 text-xs truncate"><span className="text-purple-400 mr-1">+</span>{u.name}</p>
                                          <p className="text-white/20 text-[10px] pl-3 truncate">{u.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                          <span className="text-purple-400/60 text-xs">+{u.price.toFixed(2)}&euro;</span>
                                          <button onClick={() => removeUpsell(i, u.id)} className="text-white/20 hover:text-red-400 transition-colors cursor-pointer">
                                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                          </button>
                                        </div>
                                      </div>
                                      {/* Pokemon picker when "choose pokemon" upsell is active */}
                                      {u.id === "upsell-choose-pokemon" && item.product.pokemonPool && (
                                        <div className="ml-5 mt-1.5 mb-2 pl-4 border-l-2 border-purple-500/20">
                                          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2 font-medium">
                                            {item.chosenPokemon ? "Pokemon choisi" : "Choisis ton Pokemon"}
                                          </p>
                                          <div className="flex flex-wrap gap-1.5">
                                            {item.product.pokemonPool.map((p) => {
                                              const isSelected = item.chosenPokemon === p.name;
                                              return (
                                                <button
                                                  key={p.name}
                                                  onClick={() => setChosenPokemon(i, p.name)}
                                                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                                                    isSelected
                                                      ? "bg-purple-500/20 border-purple-500/40 text-purple-200"
                                                      : "bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/[0.06] hover:text-white/60"
                                                  }`}
                                                >
                                                  {p.name}
                                                </button>
                                              );
                                            })}
                                          </div>
                                          {!item.chosenPokemon && (
                                            <p className="text-orange-400/60 text-[10px] mt-1.5">Selectionne un Pokemon pour continuer</p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Available upsells for this pack */}
                              {availableUpsells.length > 0 && (
                                <div className="px-3 pb-2 pt-1">
                                  <p className="text-white/20 text-[10px] uppercase tracking-wider mb-1.5 pl-1">Options</p>
                                  <div className="space-y-1">
                                    {availableUpsells.map((upsell) => {
                                      const saved = upsell.realPrice - upsell.price;
                                      return (
                                        <button key={upsell.id} onClick={() => addUpsell(i, upsell)}
                                          className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg border border-dashed border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/10 transition-colors cursor-pointer text-left">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                              <p className="text-white/70 text-xs truncate">{upsell.name}</p>
                                              <span className="px-1 py-0.5 rounded text-[8px] font-bold bg-green-500/15 text-green-400 border border-green-500/20 whitespace-nowrap shrink-0">
                                                -{Math.round((saved / upsell.realPrice) * 100)}%
                                              </span>
                                            </div>
                                            <p className="text-white/25 text-[10px] truncate">{upsell.description}</p>
                                          </div>
                                          <div className="ml-2 text-right whitespace-nowrap shrink-0">
                                            <span className="text-purple-400 text-xs font-bold">+{upsell.price.toFixed(2)}&euro;</span>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Duplicate pack offer */}
                              {canDuplicate && (
                                <div className="px-3 pb-2.5 pt-0.5">
                                  <button onClick={() => duplicatePack(i)}
                                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg border border-dashed border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-pointer text-left">
                                    <div className="flex items-center gap-2">
                                      <span className="text-green-400 text-sm">x2</span>
                                      <div>
                                        <p className="text-white/80 text-xs font-medium">Un 2eme {item.product.name} a -50%</p>
                                        <p className="text-white/25 text-[10px]">Tout le contenu du pack en double !</p>
                                      </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-2">
                                      <span className="text-white/30 text-[10px] line-through block">{item.product.price.toFixed(2)}&euro;</span>
                                      <span className="text-green-400 text-xs font-bold">+{(Math.round(item.product.price * 50) / 100).toFixed(2)}&euro;</span>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Cross-sell suggestions */}
              {crossSells.length > 0 && cart.length > 0 && (
                <div className="mb-4">
                  <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2 font-medium">Tu pourrais aimer</p>
                  <div className="space-y-1.5">
                    {crossSells.map((cs) => {
                      const discountedPrice = cs.discountPercent
                        ? Math.round(cs.product.price * (100 - cs.discountPercent)) / 100
                        : cs.product.price;
                      return (
                        <button key={cs.product.id} onClick={() => cs.discountPercent ? addCrossSell(cs) : addToCart(cs.product)}
                          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl border border-dashed transition-colors cursor-pointer text-left hover:bg-orange-500/5"
                          style={{ borderColor: `${cs.product.color}25` }}>
                          {cs.product.customImage && (
                            <img src={cs.product.customImage} alt="" className="w-8 h-8 object-contain shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-white/80 text-xs font-medium truncate">{cs.product.name}</p>
                              {cs.discountPercent && (
                                <span className="px-1 py-0.5 rounded text-[8px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/20 whitespace-nowrap shrink-0">-{cs.discountPercent}%</span>
                              )}
                            </div>
                            <p className="text-white/25 text-[10px] truncate">{cs.reason}</p>
                          </div>
                          <div className="text-right shrink-0 ml-1">
                            {cs.discountPercent && (
                              <span className="text-white/25 text-[10px] line-through block">{cs.product.price.toFixed(2)}&euro;</span>
                            )}
                            <span className="text-sm font-bold" style={{ color: cs.product.color }}>+{discountedPrice.toFixed(2)}&euro;</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grade upsell */}
              {gradeUpsell && (
                <div className="mb-6 p-4 rounded-xl border" style={{ borderColor: `${gradeUpsell.color}30`, background: `${gradeUpsell.color}08` }}>
                  <p className="text-white text-sm font-medium mb-1">
                    Plus que <span className="font-bold" style={{ color: gradeUpsell.color }}>{gradeUpsell.amountNeeded.toFixed(2)}&euro;</span> pour debloquer
                  </p>
                  <p className="text-lg font-bold" style={{ color: gradeUpsell.color }}>[{gradeUpsell.grade.toUpperCase()}]</p>
                  <p className="text-white/30 text-xs mt-1">Ajoute un produit pour atteindre ce grade !</p>
                </div>
              )}

              {/* Promo code */}
              {cart.length > 0 && (
                <div className="mb-4">
                  {promoApplied ? (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-xs font-bold">&#10003;</span>
                        <span className="text-green-400 text-sm font-medium">{promoApplied.code}</span>
                        <span className="text-green-400/60 text-xs">
                          {promoApplied.percentOff ? `(-${promoApplied.percentOff}%)` : promoApplied.amountOff ? `(-${promoApplied.amountOff.toFixed(2)}\u20AC)` : ""}
                        </span>
                      </div>
                      <button onClick={() => { setPromoApplied(null); setPromoCode(""); }} className="text-white/30 hover:text-red-400 text-xs cursor-pointer">retirer</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }}
                        onKeyDown={(e) => { if (e.key === "Enter") applyPromoCode(); }}
                        placeholder="Code promo"
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors uppercase"
                        maxLength={30}
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={promoLoading || !promoCode.trim()}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-white/10 text-white hover:bg-white/15"
                      >
                        {promoLoading ? "..." : "Appliquer"}
                      </button>
                    </div>
                  )}
                  {promoError && <p className="text-red-400 text-xs mt-1.5 text-center">{promoError}</p>}
                </div>
              )}

              {/* Total + pay */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/30 text-sm">Sous-total</span>
                    <span className="text-white/40 text-sm">{cartTotal.toFixed(2)}&euro;</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-400 text-sm">Promo ({promoApplied?.code})</span>
                      <span className="text-green-400 text-sm font-medium">-{promoDiscount.toFixed(2)}&euro;</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-white/50 font-medium">Total</span>
                    <span className="text-2xl font-bold text-white">{cartFinal.toFixed(2)}&euro;</span>
                  </div>
                  {cart.some((c) => ["vip-trainer", "vip-plus"].includes(c.product.id)) && (
                    <label className="flex items-start gap-3 mb-4 p-3 rounded-lg border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                      <input
                        type="checkbox"
                        checked={anonymousMode}
                        onChange={(e) => setAnonymousMode(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded accent-purple-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-white/80 text-sm font-medium">Mode anonyme</span>
                        <p className="text-white/30 text-xs mt-0.5">Je ne souhaite pas recevoir les badges VIP en jeu (chat, tab, au-dessus de la tete). Les avantages restent actifs.</p>
                      </div>
                    </label>
                  )}
                  {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}
                  <button
                    onClick={handleCheckout}
                    disabled={loading || !playerNameSet}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-blue-500"
                  >
                    {loading ? "Redirection..." : `Payer ${cartFinal.toFixed(2)}\u20AC`}
                  </button>
                  <p className="text-white/15 text-[10px] text-center mt-3">
                    Paiement securise par Stripe. En procedant, tu acceptes la livraison immediate et renonces a ton droit de retractation.
                    Achat reserve aux personnes majeures ou avec autorisation parentale.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Gacha probabilities + legal ── */}
      <div className="max-w-4xl mx-auto mt-20">
        {/* Gacha drop rates */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">&#x1F3B0;</span>
            <h3 className="text-white font-bold">Probabilites du Gacha</h3>
          </div>
          <p className="text-white/30 text-sm mb-4">
            Les jetons gacha s&apos;utilisent dans les machines en jeu. Voici les taux de drop par rarete :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-3 text-center">
              <p className="text-green-400 text-2xl font-bold">60%</p>
              <p className="text-green-400/60 text-xs font-medium uppercase tracking-wider">Commun</p>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-center">
              <p className="text-blue-400 text-2xl font-bold">25%</p>
              <p className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">Rare</p>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-center">
              <p className="text-purple-400 text-2xl font-bold">12%</p>
              <p className="text-purple-400/60 text-xs font-medium uppercase tracking-wider">Epique</p>
            </div>
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
              <p className="text-yellow-400 text-2xl font-bold">3%</p>
              <p className="text-yellow-400/60 text-xs font-medium uppercase tracking-wider">Legendaire</p>
            </div>
          </div>
          <p className="text-white/15 text-[10px] mt-3 text-center">
            Les probabilites sont identiques a chaque tirage. Un tirage n&apos;influence pas les suivants.
          </p>
        </div>

        {/* Legal disclaimers */}
        <div className="text-center space-y-2 text-white/15 text-[10px] leading-relaxed">
          <p>
            Les jetons gacha permettent d&apos;obtenir des recompenses aleatoires en jeu.
            Les recompenses n&apos;ont aucune valeur monetaire et ne sont ni echangeables ni remboursables contre de l&apos;argent reel.
          </p>
          <p>
            Achat reserve aux personnes majeures ou avec autorisation parentale.
            En achetant, vous confirmez avoir l&apos;age legal ou l&apos;autorisation d&apos;un representant legal.
          </p>
          <p>
            Conformement a l&apos;article L221-28 du Code de la consommation, le droit de retractation ne s&apos;applique pas
            aux contenus numeriques livres immediatement apres l&apos;achat.
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes gacha-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gacha-catch-badge {
          0% { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.7); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">À propos</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Le serveur</h2>
            <p className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto">
              Cobblenite est un serveur Minecraft Cobblemon francophone. Capture, entraîne et combats
              des Pokémon dans un monde ouvert avec tes amis. 1000+ Pokémon, des mécaniques uniques et
              une communauté active t&apos;attendent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
                title: "Monde ouvert Pokémon",
                desc: "Explore des biomes uniques, des temples améliorés, des villages avec PokéCenters et des dimensions exclusives comme Kanto.",
                color: "from-green-500/20 to-emerald-500/20",
                border: "border-green-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                ),
                title: "Ligue PvE Ranked",
                desc: "Système ELO avec 8 rangs (Bronze → Challenger). Bats des dresseurs IA et débloque des armures cosmétiques exclusives.",
                color: "from-yellow-500/20 to-amber-500/20",
                border: "border-yellow-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ),
                title: "Pokémon Alpha",
                desc: "Des spécimens plus grands, plus puissants et ultra-rares apparaissent dans la nature. Sauras-tu les capturer ?",
                color: "from-red-500/20 to-orange-500/20",
                border: "border-red-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ),
                title: "Méga-Évolutions",
                desc: "Farme les Méga Gemmes et déclenche la puissance ultime de tes Pokémon en combat.",
                color: "from-purple-500/20 to-violet-500/20",
                border: "border-purple-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                ),
                title: "Raids & Arènes",
                desc: "Affronte des Raids en équipe avec du loot revu et bats les Champions d'arène pour prouver ta valeur.",
                color: "from-blue-500/20 to-cyan-500/20",
                border: "border-blue-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                ),
                title: "Voice Chat in-game",
                desc: "Parle en vocal directement en jeu — la proximité compte. Discute avec les dresseurs autour de toi.",
                color: "from-pink-500/20 to-rose-500/20",
                border: "border-pink-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
                title: "Économie complète",
                desc: "GTS entre joueurs, boutique NPC, CobbleDollars, crates de vote avec des légendaires et shinys ultra-rares.",
                color: "from-emerald-500/20 to-teal-500/20",
                border: "border-emerald-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                ),
                title: "Cosmétiques",
                desc: "Armures de teams (Rocket, Aqua, Magma...), chapeaux Pokémon, skins de rang PvE et bien plus.",
                color: "from-amber-500/20 to-yellow-500/20",
                border: "border-amber-500/20",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                ),
                title: "Launcher custom",
                desc: "Tout-en-un : mods, mises à jour automatiques, zéro configuration. Télécharge, lance, joue.",
                color: "from-indigo-500/20 to-blue-500/20",
                border: "border-indigo-500/20",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`relative group p-6 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border ${feature.border} hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5`}
              >
                <div className="text-white/70 mb-4 group-hover:text-white/90 transition-colors">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
            {[
              { value: "1000+", label: "Pokémon" },
              { value: "150+", label: "Mods" },
              { value: "9", label: "Dimensions" },
              { value: "8", label: "Rangs ELO" },
            ].map((stat) => (
              <div key={stat.label} className="px-6">
                <p className="text-3xl font-bold bg-gradient-to-b from-purple-300 to-purple-500 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/30 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
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

      {/* Comment rejoindre - étapes */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">Guide</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Comment rejoindre ?</h2>
            <p className="text-lg text-white/40">4 étapes simples pour commencer ton aventure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Télécharge le launcher",
                desc: "Installe notre launcher custom qui gère tous les mods automatiquement.",
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                ),
              },
              {
                step: "2",
                title: "Rejoins le Discord",
                desc: "Rejoins notre communauté pour faire ta demande de whitelist.",
                icon: (
                  <svg className="w-7 h-7" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
                ),
              },
              {
                step: "3",
                title: "Demande la whitelist",
                desc: "Fais ta demande dans le salon dédié — la whitelist est automatique, tu seras accepté en quelques secondes.",
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
              },
              {
                step: "4",
                title: "Lance et joue !",
                desc: "Ouvre le launcher, connecte-toi à play.cobblenite.fr et c'est parti !",
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/20 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-400 mb-4">
                  {item.icon}
                </div>
                <div className="absolute top-4 right-4 text-4xl font-black text-white/[0.04]">{item.step}</div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                href={LAUNCHER_URL}
                className="group flex items-center gap-3 px-6 py-3.5 bg-purple-500/15 hover:bg-purple-500/25 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/15"
              >
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Windows (.exe)
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href={LAUNCHER_MAC_URL}
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
              >
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                macOS (.dmg)
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href={LAUNCHER_LINUX_URL}
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
              >
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Linux (.AppImage)
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

      {/* FAQ */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">Questions</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Le serveur est-il gratuit ?",
                a: "Oui ! Cobblenite est 100% gratuit. La boutique propose uniquement des cosmétiques et des bonus optionnels qui ne donnent aucun avantage en combat.",
              },
              {
                q: "Faut-il un PC puissant pour jouer ?",
                a: "Le modpack est optimisé grâce à des mods de performance (Sodium, Lithium, etc.). Un PC capable de faire tourner Minecraft Java devrait suffire. On recommande au minimum 4 Go de RAM alloués.",
              },
              {
                q: "Comment installer les mods ?",
                a: "Télécharge notre launcher custom depuis le Discord ou la section \"Rejoindre\" du site. Il gère automatiquement tous les mods et leurs mises à jour.",
              },
              {
                q: "C'est quoi la whitelist ?",
                a: "Le serveur est en whitelist pour protéger la communauté. Rejoins le Discord, poste ton pseudo Minecraft dans le salon dédié, et un admin t'ajoutera rapidement.",
              },
              {
                q: "Y a-t-il un wipe prévu ?",
                a: "Aucun wipe n'est prévu. Ton aventure, tes Pokémon et ta progression sont en sécurité.",
              },
              {
                q: "Combien de Pokémon sont disponibles ?",
                a: "Plus de 1000 Pokémon de toutes les générations sont disponibles, incluant les Méga-Évolutions, les formes Alola/Galar/Hisui et des shinys.",
              },
            ].map((faq, i) => (
              <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-white font-semibold list-none">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-white/30 group-open:rotate-45 transition-transform duration-300 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </summary>
                <div className="px-6 pb-5 text-white/40 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
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
