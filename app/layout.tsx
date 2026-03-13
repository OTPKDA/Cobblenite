import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cobblenite — Serveur Minecraft Cobblemon Francophone",
  description: "Rejoins Cobblenite, le serveur Minecraft Cobblemon francophone. 1000+ Pokemon, Ligue PvE ranked, Mega-Evolutions, Raids, Voice Chat et bien plus. Capture, entraine et combats des Pokemon avec tes amis !",
  keywords: ["cobblenite", "cobblemon", "minecraft", "serveur", "pokemon", "francophone", "france", "fabric", "modde"],
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
  },
  openGraph: {
    title: "Cobblenite — Serveur Minecraft Cobblemon",
    description: "Le serveur Minecraft Pokemon francophone. 1000+ Pokemon, Ligue PvE, Mega-Evolutions, Raids et plus encore !",
    url: "https://cobblenite.fr",
    siteName: "Cobblenite",
    images: [{ url: "/hero-bg.webp", width: 1920, height: 1080, alt: "Cobblenite - Serveur Cobblemon" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cobblenite — Serveur Minecraft Cobblemon",
    description: "Le serveur Minecraft Pokemon francophone. 1000+ Pokemon, Ligue PvE, Mega-Evolutions, Raids et plus encore !",
    images: ["/hero-bg.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
