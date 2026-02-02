"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

const NAV_ITEMS = [
  { id: "hero", label: "Cobblenite", href: "#" },
  { id: "presentation", label: "Le serveur", href: "#presentation" },
  { id: "wiki", label: "Wiki", href: "#wiki" },
  { id: "rejoindre", label: "Rejoindre", href: "#rejoindre" },
  { id: "vip", label: "VIP", href: "#vip" },
  { id: "discord", label: "Discord", href: "#discord" },
];

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
      const sections = ["discord", "vip", "rejoindre", "wiki", "presentation"];
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
          <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-5 shadow-lg shadow-black/20">
            <code className="text-2xl font-mono bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">{SERVER_IP}</code>
            <CopyButton text={SERVER_IP} />
          </div>
        </div>
      </section>

      {/* Pikachu - entre Rejoindre et VIP */}
      <div className="relative h-0 max-w-7xl mx-auto">
        <ParallaxImage src="/pika.webp" alt="Pikachu" speed={-0.15} className="absolute -left-[300px] md:-left-[500px] top-1/2 w-[600px] md:w-[1200px] pointer-events-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]" />
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
      </footer>
    </main>
  );
}
