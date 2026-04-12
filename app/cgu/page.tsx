import type { Metadata } from "next";
import LegalLayout from "../_components/LegalLayout";

export const metadata: Metadata = {
  title: "CGU — Conditions Générales d'Utilisation — Cobblenite",
  description: "Conditions générales d'utilisation du serveur Minecraft Cobblenite : règles, modération, sanctions.",
};

export default function CGU() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" gradient="from-blue-400 via-cyan-400 to-green-400" lastUpdate="12 avril 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-3">1. Objet</h2>
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») régissent l&apos;accès et
          l&apos;utilisation du serveur Minecraft <strong>Cobblenite</strong> (play.cobblenite.fr), du site web
          cobblenite.fr, du serveur Discord associé et de tous les services rattachés.
        </p>
        <p className="mt-2">
          En rejoignant le serveur ou en utilisant les services, vous acceptez intégralement et sans réserve les
          présentes CGU.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">2. Accès au serveur</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Le serveur est accessible gratuitement via un compte Minecraft Java Edition valide.</li>
          <li>L&apos;accès est soumis à une <strong>whitelist</strong> (liste blanche) après inscription sur Discord.</li>
          <li>L&apos;utilisation du launcher officiel Cobblenite est recommandée pour l&apos;installation des mods.</li>
          <li>L&apos;équipe se réserve le droit de refuser ou suspendre un accès sans justification.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">3. Règles de conduite</h2>
        <p>Les comportements suivants sont <strong>strictement interdits</strong> sur le serveur et le Discord :</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Insultes, harcèlement, propos discriminatoires, racistes, sexistes, homophobes, transphobes.</li>
          <li>Diffusion de contenu illégal, pornographique, violent ou haineux.</li>
          <li>Utilisation de cheats, hacks, mods clients non autorisés, X-Ray, dupe, exploits de bugs.</li>
          <li>Griefing, vol organisé hors zones prévues, destruction des constructions d&apos;autrui.</li>
          <li>Publicité pour d&apos;autres serveurs, spam, flood.</li>
          <li>Usurpation d&apos;identité, partage de compte, multi-comptes sans autorisation.</li>
          <li>Scam, escroqueries, échanges en dehors des systèmes officiels (GTS, boutique).</li>
          <li>Toute tentative d&apos;attaque informatique (DDoS, exploit, injection).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">4. Sanctions</h2>
        <p>
          L&apos;équipe de modération peut appliquer, de manière proportionnée et à sa discrétion, les sanctions
          suivantes :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Avertissement</strong> — rappel à l&apos;ordre</li>
          <li><strong>Mute</strong> — interdiction temporaire de parler (chat et/ou voice chat)</li>
          <li><strong>Kick</strong> — exclusion temporaire de la session en cours</li>
          <li><strong>Ban temporaire</strong> — interdiction d&apos;accès pour une durée limitée</li>
          <li><strong>Ban définitif</strong> — exclusion permanente du serveur et du Discord</li>
          <li><strong>Réinitialisation / confiscation</strong> — suppression d&apos;objets obtenus par triche</li>
        </ul>
        <p className="mt-2">
          Les sanctions sont consignées et peuvent être contestées via un ticket Discord dans un délai raisonnable.
          Aucun remboursement ne sera effectué en cas de bannissement pour non-respect des CGU.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">5. Contenu utilisateur</h2>
        <p>
          Les constructions, créations et messages publiés par les joueurs restent leur propriété, mais les joueurs
          accordent à Cobblenite une licence non exclusive d&apos;utilisation (captures, vidéos promotionnelles,
          conservation en backup).
        </p>
        <p className="mt-2">
          L&apos;équipe se réserve le droit de supprimer ou modifier tout contenu contraire aux présentes CGU ou à la
          loi française.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">6. Disponibilité du service</h2>
        <p>
          Cobblenite est un projet communautaire non professionnel. Aucune garantie de disponibilité n&apos;est
          apportée : le serveur peut subir des interruptions, maintenances, pertes de données, wipes partiels ou
          totaux sans préavis.
        </p>
        <p className="mt-2">
          Des backups automatiques sont effectués régulièrement mais ne constituent pas une garantie de restauration.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">7. Responsabilité</h2>
        <p>
          Cobblenite ne peut être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation
          du serveur, de la perte de données en jeu, de l&apos;indisponibilité temporaire ou de la cessation
          définitive du service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">8. Modification des CGU</h2>
        <p>
          Les présentes CGU peuvent être modifiées à tout moment. Les joueurs seront informés via Discord ou le site.
          L&apos;utilisation continue du service après modification vaut acceptation des nouvelles conditions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">9. Droit applicable</h2>
        <p>
          Les présentes CGU sont régies par le droit français. Tout litige relève de la compétence des tribunaux
          français.
        </p>
      </section>
    </LegalLayout>
  );
}
