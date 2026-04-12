import type { ReactNode } from "react";

export default function LegalLayout({
  title,
  gradient = "from-green-400 via-blue-400 to-purple-400",
  lastUpdate,
  children,
}: {
  title: string;
  gradient?: string;
  lastUpdate: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/3 blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour au site
        </a>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h1>
          <p className="text-white/40 text-sm">Dernière mise à jour : {lastUpdate}</p>
        </div>

        <article className="prose prose-invert max-w-none bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-10 space-y-8 text-white/70 leading-relaxed">
          {children}
        </article>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs text-white/30">
          <a href="/mentions-legales" className="hover:text-white/60 transition-colors">Mentions légales</a>
          <span>·</span>
          <a href="/cgu" className="hover:text-white/60 transition-colors">CGU</a>
          <span>·</span>
          <a href="/cgv" className="hover:text-white/60 transition-colors">CGV</a>
          <span>·</span>
          <a href="/confidentialite" className="hover:text-white/60 transition-colors">Confidentialité</a>
        </div>
      </div>
    </main>
  );
}
