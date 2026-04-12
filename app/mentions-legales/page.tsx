import type { Metadata } from "next";
import LegalLayout from "../_components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales — Cobblenite",
  description: "Mentions légales du site Cobblenite : éditeur, hébergeur, propriété intellectuelle.",
};

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" lastUpdate="12 avril 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-3">1. Éditeur du site</h2>
        <p>
          Le site <strong>cobblenite.fr</strong> est édité à titre personnel et non professionnel par un
          particulier dans le cadre d&apos;un projet communautaire à but non lucratif.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Responsable de publication : <strong>Loukoulele</strong></li>
          <li>Adresse de contact : <a href="mailto:contact@cobblenite.fr" className="text-blue-400 hover:text-blue-300">contact@cobblenite.fr</a></li>
          <li>Serveur Discord officiel : <a href="https://discord.gg/cobblenite" className="text-blue-400 hover:text-blue-300">discord.gg/cobblenite</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">2. Hébergement</h2>
        <p>Le site web est hébergé par :</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Netlify, Inc.</strong> — 44 Montgomery Street, Suite 300, San Francisco, California 94104, USA — <a href="https://www.netlify.com" className="text-blue-400 hover:text-blue-300">netlify.com</a></li>
        </ul>
        <p className="mt-3">Le serveur de jeu Minecraft est hébergé par :</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Hetzner Online GmbH</strong> — Industriestr. 25, 91710 Gunzenhausen, Allemagne — <a href="https://www.hetzner.com" className="text-blue-400 hover:text-blue-300">hetzner.com</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">3. Propriété intellectuelle</h2>
        <p>
          Le contenu original du site (code, textes, logo Cobblenite, illustrations propres) est protégé par le droit
          d&apos;auteur. Toute reproduction sans autorisation est interdite.
        </p>
        <p className="mt-2">
          Cobblenite est un projet communautaire <strong>non officiel</strong>. Ce serveur n&apos;est ni affilié, ni
          approuvé, ni sponsorisé par :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Pokémon</strong> — The Pokémon Company, Nintendo, Game Freak, Creatures Inc.</li>
          <li><strong>Mojang Studios</strong> / Microsoft (Minecraft)</li>
          <li><strong>Cobblemon</strong> (mod open-source)</li>
        </ul>
        <p className="mt-2">
          Tous les noms, logos et marques appartiennent à leurs propriétaires respectifs et sont utilisés à titre
          illustratif dans le cadre d&apos;un usage communautaire.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">4. Prestataires tiers</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Stripe Payments Europe, Ltd.</strong> — traitement des paiements (<a href="https://stripe.com" className="text-blue-400 hover:text-blue-300">stripe.com</a>)</li>
          <li><strong>Discord Inc.</strong> — communauté et authentification</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">5. Contact</h2>
        <p>
          Pour toute question relative au site ou au serveur, contactez-nous via Discord ou par e-mail à{" "}
          <a href="mailto:contact@cobblenite.fr" className="text-blue-400 hover:text-blue-300">contact@cobblenite.fr</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
