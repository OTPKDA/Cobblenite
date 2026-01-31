"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SERVER_IP = "play.cobblenite.fr";
const TEBEX_URL = "https://cobblenite.tebex.io";

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

const NAV_ITEMS = [
  { id: "hero", label: "Cobblenite", href: "#" },
  { id: "presentation", label: "Le serveur", href: "#presentation" },
  { id: "rejoindre", label: "Rejoindre", href: "#rejoindre" },
  { id: "vip", label: "VIP", href: "#vip" },
];

export default function Home() {
  const [active, setActive] = useState("hero");
  const [bubble, setBubble] = useState({ left: 0, width: 0 });
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
        setActive("vip");
        return;
      }
      const sections = ["vip", "rejoindre", "presentation"];
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

      {/* Navigation */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
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
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover object-[25%_center]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/60 via-[#050510]/40 to-[#050510]" />
        </div>
        <p className="relative z-10 text-sm uppercase tracking-[0.3em] text-white mb-6 font-medium">Minecraft Cobblemon</p>
        <h1 className="relative z-10 text-7xl md:text-9xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
          Cobblenite
        </h1>
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

      {/* Dracaufeu - entre Serveur et Rejoindre */}
      <div className="relative h-0 max-w-7xl mx-auto">
        <img src="/dracau.png" alt="Dracaufeu" className="absolute -right-[300px] md:-right-[500px] top-1/2 -translate-y-1/2 w-[600px] md:w-[1200px] pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]" />
      </div>

      {/* Rejoindre */}
      <section id="rejoindre" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium">Connexion</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Rejoindre</h2>
          <p className="text-white/40 mb-8">Copie l&apos;IP et rejoins-nous en jeu</p>
          <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-5 shadow-lg shadow-black/20">
            <code className="text-2xl font-mono bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">{SERVER_IP}</code>
            <CopyButton text={SERVER_IP} />
          </div>
        </div>
      </section>

      {/* Pikachu - entre Rejoindre et VIP */}
      <div className="relative h-0 max-w-7xl mx-auto">
        <img src="/pika.png" alt="Pikachu" className="absolute -left-[300px] md:-left-[500px] top-1/2 -translate-y-1/2 w-[600px] md:w-[1200px] pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]" />
      </div>

      {/* VIP */}
      <section id="vip" className="relative py-32 px-6">
        <div className="max-w-sm mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400/60 mb-4 font-medium text-center">Premium</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Grade VIP</h2>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/5 hover:border-white/20 transition-all duration-500">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4">VIP Trainer</span>
              <p className="text-white/40 mt-2">Deviens un dresseur d&apos;élite sur Cobblenite</p>
              <p className="text-white text-3xl font-bold mt-4">4.99&euro;<span className="text-white/40 text-base font-normal">/mois</span></p>
            </div>
            <ul className="space-y-4 text-white/60 mb-10">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#facc15" opacity="0.2"/><text x="10" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#facc15">x2</text></svg>
                XP Pokémon x2 sur tous les combats
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#7c3aed"/><line x1="3" y1="10" x2="17" y2="10" stroke="#1a1a2e" strokeWidth="2"/><circle cx="10" cy="10" r="3" fill="white" stroke="#1a1a2e" strokeWidth="1.5"/><path d="M 5 4 Q 10 0 15 4" fill="none" stroke="#c084fc" strokeWidth="1.5"/></svg>
                1 Master Ball par semaine
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#ef4444" /><circle cx="10" cy="10" r="9" fill="url(#pokeball)"/><defs><linearGradient id="pokeball" x1="0" y1="0" x2="0" y2="1"><stop offset="50%" stopColor="#ef4444"/><stop offset="50%" stopColor="white"/></linearGradient></defs><line x1="1" y1="10" x2="19" y2="10" stroke="#1a1a2e" strokeWidth="2"/><circle cx="10" cy="10" r="3" fill="white" stroke="#1a1a2e" strokeWidth="1.5"/></svg>
                25 Poké Balls par jour
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="url(#ultraball)"/><defs><linearGradient id="ultraball" x1="0" y1="0" x2="0" y2="1"><stop offset="50%" stopColor="#1a1a2e"/><stop offset="50%" stopColor="white"/></linearGradient></defs><line x1="1" y1="10" x2="19" y2="10" stroke="#facc15" strokeWidth="2"/><circle cx="10" cy="10" r="3" fill="white" stroke="#facc15" strokeWidth="1.5"/></svg>
                5 Ultra Balls par jour
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-300 text-xs font-bold font-mono tracking-wider shadow-[0_0_8px_rgba(234,179,8,0.3)]">VIP</span> Préfixe en chat
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block px-2.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs font-bold font-mono shadow-[0_0_8px_rgba(59,130,246,0.3)]">60</span> Slots de PC supplémentaires
              </li>
            </ul>
            <a
              href={TEBEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white rounded-full font-medium transition-all duration-300 border border-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/10"
            >
              S&apos;abonner
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-10 px-6 text-center text-sm text-white/20">
        &copy; {new Date().getFullYear()} Cobblenite. Tous droits réservés.
      </footer>
    </main>
  );
}
