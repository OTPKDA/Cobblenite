import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votes — Cobblenite",
  description:
    "Vote pour Cobblenite et gagne des cles pour ouvrir des crates avec des Pokemon, objets rares et legendaires !",
};

// ─── Types ───
type Rarity = "Commun" | "Rare" | "Epique" | "Mythique" | "Legendaire";

interface LootItem {
  name: string;
  pokemon?: boolean;
  shiny?: boolean;
}

interface LootTier {
  rarity: Rarity;
  chance: string;
  items: LootItem[];
}

interface Crate {
  name: string;
  ball: string;
  command: string;
  color: string;
  colorDim: string;
  description: string;
  tiers: LootTier[];
}

// ─── Rarity config ───
const RARITY_COLORS: Record<Rarity, string> = {
  Commun: "#9ca3af",
  Rare: "#a78bfa",
  Epique: "#fbbf24",
  Mythique: "#f97316",
  Legendaire: "#ef4444",
};

// ─── Vote sites ───
const VOTE_SITES = [
  {
    name: "Serveur-Minecraft.com",
    url: "https://serveur-minecraft.com/5364",
    command: "/vote1",
    crate: "Premier Ball",
  },
  {
    name: "Serveur-Prive.net",
    url: "https://serveur-prive.net/minecraft/cobblenite/vote",
    command: "/vote2",
    crate: "Dive Ball",
  },
  {
    name: "Top-Serveurs.net",
    url: "https://top-serveurs.net/minecraft/vote/cobblenite",
    command: "/vote3",
    crate: "Dusk Ball",
  },
  {
    name: "Serveur-Minecraft-Vote.fr",
    url: "https://serveur-minecraft-vote.fr/serveurs/cobblenite.2604/vote",
    command: "/vote4",
    crate: "Luxury Ball",
  },
];

// ─── Crate data ───
const CRATES: Crate[] = [
  {
    name: "Premier Ball",
    ball: "Premier Ball",
    command: "/vote1",
    color: "#4ade80",
    colorDim: "rgba(74, 222, 128, 0.15)",
    description: "Crate polyvalente pour bien demarrer",
    tiers: [
      {
        rarity: "Commun",
        chance: "65%",
        items: [
          { name: "10 Poke Balls" },
          { name: "5 Great Balls" },
          { name: "5 Potions" },
          { name: "3 Super Potions" },
          { name: "5 Baies Oran" },
          { name: "3 Baies Sitrus" },
          { name: "5 Exp Candy S" },
          { name: "3 Exp Candy M" },
          { name: "2 Rappels" },
          { name: "Wattouat Nv.10", pokemon: true },
          { name: "Racaillou Nv.10", pokemon: true },
          { name: "Magicarpe Nv.10", pokemon: true },
          { name: "Roucool Nv.10", pokemon: true },
          { name: "Nidoran Nv.10", pokemon: true },
          { name: "Sabelette Nv.10", pokemon: true },
          { name: "Psykokwak Nv.10", pokemon: true },
          { name: "Stari Nv.10", pokemon: true },
        ],
      },
      {
        rarity: "Rare",
        chance: "20%",
        items: [
          { name: "1 Restes" },
          { name: "5 Super Bonbon" },
          { name: "1 Capsule Talent" },
          { name: "10 Ultra Balls" },
          { name: "Evoli Nv.15", pokemon: true },
          { name: "Pikachu Nv.15", pokemon: true },
          { name: "Abra Nv.15", pokemon: true },
          { name: "Togepi Nv.15", pokemon: true },
          { name: "Magneti Nv.15", pokemon: true },
          { name: "Elekid Nv.15", pokemon: true },
          { name: "Melofee Nv.15", pokemon: true },
          { name: "Porygon Nv.15", pokemon: true },
          { name: "Metamorph Nv.15", pokemon: true },
        ],
      },
      {
        rarity: "Epique",
        chance: "10%",
        items: [
          { name: "1 Master Ball" },
          { name: "1 Oeuf Chance" },
          { name: "3 jours VIP" },
          { name: "Bulbizarre Nv.20", pokemon: true },
          { name: "Germignon Nv.20", pokemon: true },
          { name: "Arcko Nv.20", pokemon: true },
          { name: "Lokhlass Nv.20", pokemon: true },
          { name: "Ptera Nv.20", pokemon: true },
          { name: "Motisma Nv.20", pokemon: true },
        ],
      },
      {
        rarity: "Mythique",
        chance: "5%",
        items: [
          { name: "Shiny Aleatoire Nv.30", pokemon: true, shiny: true },
          { name: "7 jours VIP" },
          { name: "2 Master Balls" },
          { name: "Minidraco Nv.35", pokemon: true },
          { name: "Draby Nv.35", pokemon: true },
          { name: "Coupenotte Nv.35", pokemon: true },
          { name: "Pyronille Nv.35", pokemon: true },
          { name: "Sonistrelle Nv.35", pokemon: true },
          { name: "Monorpale Nv.35", pokemon: true },
        ],
      },
      {
        rarity: "Legendaire",
        chance: "0.5%",
        items: [
          { name: "Artikodin Nv.50", pokemon: true },
          { name: "Shiny Lucario Nv.30", pokemon: true, shiny: true },
          { name: "Lugia Nv.70", pokemon: true },
          { name: "30 jours VIP" },
          { name: "Shiny Artikodin Nv.50", pokemon: true, shiny: true },
          { name: "Mew Nv.50", pokemon: true },
          { name: "Rayquaza Nv.70", pokemon: true },
          { name: "Dialga Nv.70", pokemon: true },
          { name: "Latios Nv.50", pokemon: true },
        ],
      },
    ],
  },
  {
    name: "Dive Ball",
    ball: "Dive Ball",
    command: "/vote2",
    color: "#3b82f6",
    colorDim: "rgba(59, 130, 246, 0.15)",
    description: "Crate aquatique aux tresors des profondeurs",
    tiers: [
      {
        rarity: "Commun",
        chance: "65%",
        items: [
          { name: "5 Dive Balls" },
          { name: "5 Net Balls" },
          { name: "3 Super Potions" },
          { name: "3 Hyper Potions" },
          { name: "5 Baies Pecha" },
          { name: "3 Baies Mepo" },
          { name: "3 Exp Candy M" },
          { name: "2 Exp Candy L" },
          { name: "2 Rappels" },
          { name: "Ptitard Nv.10", pokemon: true },
          { name: "Hypotrempe Nv.10", pokemon: true },
          { name: "Kokiyas Nv.10", pokemon: true },
          { name: "Tentacool Nv.10", pokemon: true },
          { name: "Otaria Nv.10", pokemon: true },
          { name: "Krabby Nv.10", pokemon: true },
          { name: "Axoloto Nv.10", pokemon: true },
          { name: "Nenupiot Nv.10", pokemon: true },
        ],
      },
      {
        rarity: "Rare",
        chance: "20%",
        items: [
          { name: "1 Bandeau Choix" },
          { name: "5 Super Bonbon" },
          { name: "1 Capsule Talent" },
          { name: "5 Ultra + 5 Great Balls" },
          { name: "Caninos Nv.15", pokemon: true },
          { name: "Goupix Nv.15", pokemon: true },
          { name: "Machoc Nv.15", pokemon: true },
          { name: "Farfuret Nv.15", pokemon: true },
          { name: "Ramoloss Nv.15", pokemon: true },
          { name: "Rhinocorne Nv.15", pokemon: true },
          { name: "Corayon Nv.15", pokemon: true },
          { name: "Marill Nv.15", pokemon: true },
          { name: "Barpau Nv.15", pokemon: true },
        ],
      },
      {
        rarity: "Epique",
        chance: "10%",
        items: [
          { name: "1 Master Ball" },
          { name: "1 Oeuf Chance" },
          { name: "3 jours VIP" },
          { name: "Carapuce Nv.20", pokemon: true },
          { name: "Kaiminus Nv.20", pokemon: true },
          { name: "Gobou Nv.20", pokemon: true },
          { name: "Ronflex Nv.20", pokemon: true },
          { name: "Kangourex Nv.20", pokemon: true },
          { name: "Kabuto Nv.20", pokemon: true },
        ],
      },
      {
        rarity: "Mythique",
        chance: "5%",
        items: [
          { name: "Shiny Aleatoire Nv.30", pokemon: true, shiny: true },
          { name: "7 jours VIP" },
          { name: "2 Master Balls" },
          { name: "Embrylex Nv.35", pokemon: true },
          { name: "Mucuscule Nv.35", pokemon: true },
          { name: "Tritox Nv.35", pokemon: true },
          { name: "Funecire Nv.35", pokemon: true },
          { name: "Mascaiman Nv.35", pokemon: true },
          { name: "Sepiatop Nv.35", pokemon: true },
        ],
      },
      {
        rarity: "Legendaire",
        chance: "0.5%",
        items: [
          { name: "Electhor Nv.50", pokemon: true },
          { name: "Shiny Gardevoir Nv.30", pokemon: true, shiny: true },
          { name: "Ho-Oh Nv.70", pokemon: true },
          { name: "30 jours VIP" },
          { name: "Shiny Electhor Nv.50", pokemon: true, shiny: true },
          { name: "Celebi Nv.50", pokemon: true },
          { name: "Kyogre Nv.70", pokemon: true },
          { name: "Palkia Nv.70", pokemon: true },
          { name: "Latias Nv.50", pokemon: true },
        ],
      },
    ],
  },
  {
    name: "Dusk Ball",
    ball: "Dusk Ball",
    command: "/vote3",
    color: "#fbbf24",
    colorDim: "rgba(251, 191, 36, 0.15)",
    description: "Crate sombre regorgeant de mysteres",
    tiers: [
      {
        rarity: "Commun",
        chance: "65%",
        items: [
          { name: "5 Dusk Balls" },
          { name: "5 Timer Balls" },
          { name: "3 Hyper Potions" },
          { name: "2 Max Potions" },
          { name: "5 Baies Fraive" },
          { name: "3 Baies Maron" },
          { name: "3 Exp Candy M" },
          { name: "2 Exp Candy L" },
          { name: "1 Rappel Max" },
          { name: "Nosferapti Nv.10", pokemon: true },
          { name: "Mystherbe Nv.10", pokemon: true },
          { name: "Osselait Nv.10", pokemon: true },
          { name: "Paras Nv.10", pokemon: true },
          { name: "Mimitoss Nv.10", pokemon: true },
          { name: "Soporifik Nv.10", pokemon: true },
          { name: "Mimigal Nv.10", pokemon: true },
          { name: "Hoothoot Nv.10", pokemon: true },
        ],
      },
      {
        rarity: "Rare",
        chance: "20%",
        items: [
          { name: "1 Lunettes Choix" },
          { name: "5 Super Bonbon" },
          { name: "1 Capsule Talent" },
          { name: "10 Dusk Balls" },
          { name: "Fantominus Nv.15", pokemon: true },
          { name: "Tarsal Nv.15", pokemon: true },
          { name: "Insecateur Nv.15", pokemon: true },
          { name: "Scarhino Nv.15", pokemon: true },
          { name: "Rapion Nv.15", pokemon: true },
          { name: "Tenefix Nv.15", pokemon: true },
          { name: "Skelenox Nv.15", pokemon: true },
          { name: "Scalpion Nv.15", pokemon: true },
          { name: "Riolu Nv.15", pokemon: true },
        ],
      },
      {
        rarity: "Epique",
        chance: "10%",
        items: [
          { name: "1 Master Ball" },
          { name: "1 Oeuf Chance" },
          { name: "3 jours VIP" },
          { name: "Salameche Nv.20", pokemon: true },
          { name: "Hericendre Nv.20", pokemon: true },
          { name: "Poussifeu Nv.20", pokemon: true },
          { name: "Spiritomb Nv.20", pokemon: true },
          { name: "Zorua Nv.20", pokemon: true },
          { name: "Mimiqui Nv.20", pokemon: true },
        ],
      },
      {
        rarity: "Mythique",
        chance: "5%",
        items: [
          { name: "Shiny Aleatoire Nv.30", pokemon: true, shiny: true },
          { name: "7 jours VIP" },
          { name: "2 Master Balls" },
          { name: "Terhal Nv.35", pokemon: true },
          { name: "Solochi Nv.35", pokemon: true },
          { name: "Fantyrm Nv.35", pokemon: true },
          { name: "Absol Nv.35", pokemon: true },
          { name: "Brocelome Nv.35", pokemon: true },
          { name: "Kungfouine Nv.35", pokemon: true },
        ],
      },
      {
        rarity: "Legendaire",
        chance: "0.5%",
        items: [
          { name: "Sulfura Nv.50", pokemon: true },
          { name: "Shiny Dracaufeu Nv.30", pokemon: true, shiny: true },
          { name: "Mewtwo Nv.70", pokemon: true },
          { name: "30 jours VIP" },
          { name: "Shiny Sulfura Nv.50", pokemon: true, shiny: true },
          { name: "Jirachi Nv.50", pokemon: true },
          { name: "Groudon Nv.70", pokemon: true },
          { name: "Giratina Nv.70", pokemon: true },
          { name: "Raikou Nv.50", pokemon: true },
        ],
      },
    ],
  },
  {
    name: "Luxury Ball",
    ball: "Luxury Ball",
    command: "/vote4",
    color: "#f97316",
    colorDim: "rgba(249, 115, 22, 0.15)",
    description: "Crate luxueuse aux recompenses precieuses",
    tiers: [
      {
        rarity: "Commun",
        chance: "65%",
        items: [
          { name: "5 Luxury Balls" },
          { name: "5 Quick Balls" },
          { name: "2 Max Potions" },
          { name: "2 Guerisons" },
          { name: "5 Baies Prine" },
          { name: "3 Baies Sitrus" },
          { name: "5 Exp Candy S" },
          { name: "3 Exp Candy M" },
          { name: "1 Rappel Max" },
          { name: "Cornebre Nv.10", pokemon: true },
          { name: "Malosse Nv.10", pokemon: true },
          { name: "Phanpy Nv.10", pokemon: true },
          { name: "Teddiursa Nv.10", pokemon: true },
          { name: "Marcacrin Nv.10", pokemon: true },
          { name: "Miaouss Nv.10", pokemon: true },
          { name: "Capumain Nv.10", pokemon: true },
          { name: "Scorplane Nv.10", pokemon: true },
        ],
      },
      {
        rarity: "Rare",
        chance: "20%",
        items: [
          { name: "1 Mouchoir Choix" },
          { name: "5 Super Bonbon" },
          { name: "1 Capsule Talent" },
          { name: "10 Luxury Balls" },
          { name: "Ponyta Nv.15", pokemon: true },
          { name: "Lixy Nv.15", pokemon: true },
          { name: "Galekid Nv.15", pokemon: true },
          { name: "Kraknoix Nv.15", pokemon: true },
          { name: "Airmure Nv.15", pokemon: true },
          { name: "Cerfrousse Nv.15", pokemon: true },
          { name: "Ecremeuh Nv.15", pokemon: true },
          { name: "Tauros Nv.15", pokemon: true },
          { name: "Scarabrute Nv.15", pokemon: true },
        ],
      },
      {
        rarity: "Epique",
        chance: "10%",
        items: [
          { name: "1 Master Ball" },
          { name: "1 Oeuf Chance" },
          { name: "3 jours VIP" },
          { name: "Tortipouss Nv.20", pokemon: true },
          { name: "Ouisticram Nv.20", pokemon: true },
          { name: "Tiplouf Nv.20", pokemon: true },
          { name: "Amonita Nv.20", pokemon: true },
          { name: "Kranidos Nv.20", pokemon: true },
          { name: "Arkeapti Nv.20", pokemon: true },
        ],
      },
      {
        rarity: "Mythique",
        chance: "5%",
        items: [
          { name: "Shiny Aleatoire Nv.30", pokemon: true, shiny: true },
          { name: "7 jours VIP" },
          { name: "2 Master Balls" },
          { name: "Griknot Nv.35", pokemon: true },
          { name: "Bebecaille Nv.35", pokemon: true },
          { name: "Ptyranidur Nv.35", pokemon: true },
          { name: "Amagara Nv.35", pokemon: true },
          { name: "Rocabot Nv.35", pokemon: true },
          { name: "Sovkipou Nv.35", pokemon: true },
        ],
      },
      {
        rarity: "Legendaire",
        chance: "0.5%",
        items: [
          { name: "Suicune Nv.50", pokemon: true },
          { name: "Shiny Dracolosse Nv.30", pokemon: true, shiny: true },
          { name: "Entei Nv.50", pokemon: true },
          { name: "30 jours VIP" },
          { name: "Shiny Suicune Nv.50", pokemon: true, shiny: true },
          { name: "Deoxys Nv.50", pokemon: true },
          { name: "Darkrai Nv.50", pokemon: true },
          { name: "Cresselia Nv.50", pokemon: true },
          { name: "Regigigas Nv.70", pokemon: true },
        ],
      },
    ],
  },
];

// ─── Components ───

function RarityBadge({ rarity, chance }: { rarity: Rarity; chance: string }) {
  const color = RARITY_COLORS[rarity];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {rarity} — {chance}
    </span>
  );
}

function LootList({ items }: { items: LootItem[] }) {
  const pokemonItems = items.filter((i) => i.pokemon);
  const objectItems = items.filter((i) => !i.pokemon);

  return (
    <div className="space-y-1.5">
      {objectItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {objectItems.map((item) => (
            <span
              key={item.name}
              className="px-2 py-0.5 rounded-md bg-white/5 text-white/70 text-xs"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      {pokemonItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {pokemonItems.map((item) => (
            <span
              key={item.name}
              className={`px-2 py-0.5 rounded-md text-xs ${
                item.shiny
                  ? "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20"
                  : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CrateCard({ crate }: { crate: Crate }) {
  return (
    <div
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
    >
      {/* Glow effect */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-30"
        style={{ backgroundColor: crate.color }}
      />

      {/* Header */}
      <div className="relative mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: crate.color }}
          />
          <h3
            className="text-xl font-bold"
            style={{ color: crate.color }}
          >
            {crate.name}
          </h3>
        </div>
        <p className="text-white/40 text-sm ml-6">{crate.description}</p>
        <span className="inline-block ml-6 mt-1 px-2 py-0.5 rounded bg-white/5 text-white/30 text-xs font-mono">
          {crate.command}
        </span>
      </div>

      {/* Tiers */}
      <div className="relative space-y-4">
        {crate.tiers.map((tier) => (
          <div key={tier.rarity}>
            <div className="mb-2">
              <RarityBadge rarity={tier.rarity} chance={tier.chance} />
            </div>
            <LootList items={tier.items} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ───

export default function VotesPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/3 blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour au site
        </a>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Recompenses de Vote
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-6">
            Soutiens Cobblenite en votant sur les sites partenaires !
            Chaque vote te donne <span className="text-white font-semibold">1 cle</span> pour
            ouvrir la crate correspondante.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-white/40">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              1 vote = 1 cle
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              116 Pokemon uniques
            </span>
          </div>
        </div>

        {/* Vote buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
          {VOTE_SITES.map((site) => {
            const crate = CRATES.find((c) => c.command === site.command);
            return (
              <a
                key={site.command}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: crate?.color }}
                />
                <div className="min-w-0">
                  <div className="text-white text-sm font-medium truncate">
                    {site.name}
                  </div>
                  <div className="text-white/30 text-xs">
                    {site.command} — {site.crate}
                  </div>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-auto shrink-0 text-white/20 group-hover:text-white/50 transition-colors"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            );
          })}
        </div>

        {/* Crate cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CRATES.map((crate) => (
            <CrateCard key={crate.name} crate={crate} />
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16 text-white/30 text-sm">
          <p>Les taux sont identiques pour les 4 crates — seuls les loots changent.</p>
          <p className="mt-1">
            Utilise{" "}
            <span className="font-mono text-white/40">/vote</span>{" "}
            en jeu pour acceder aux liens de vote.
          </p>
        </div>
      </div>
    </main>
  );
}
