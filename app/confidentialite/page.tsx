import type { Metadata } from "next";
import LegalLayout from "../_components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Cobblenite",
  description: "Politique de confidentialité et traitement des données personnelles (RGPD) de Cobblenite.",
};

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" gradient="from-purple-400 via-pink-400 to-red-400" lastUpdate="12 avril 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-3">1. Préambule</h2>
        <p>
          La présente politique décrit la manière dont Cobblenite collecte, utilise et protège vos données
          personnelles, conformément au <strong>Règlement Général sur la Protection des Données</strong> (RGPD -
          Règlement UE 2016/679) et à la loi Informatique et Libertés.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">2. Données collectées</h2>
        <p>Dans le cadre de l&apos;utilisation du serveur et du site, nous collectons :</p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/80">
                <th className="text-left py-2 pr-4">Donnée</th>
                <th className="text-left py-2 pr-4">Source</th>
                <th className="text-left py-2">Finalité</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5"><td className="py-2 pr-4">Pseudo Minecraft</td><td className="py-2 pr-4">Connexion</td><td className="py-2">Identification en jeu</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 pr-4">UUID Minecraft</td><td className="py-2 pr-4">Mojang</td><td className="py-2">Identifiant unique joueur</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 pr-4">Adresse IP</td><td className="py-2 pr-4">Connexion serveur</td><td className="py-2">Sécurité, anti-abus (logs)</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 pr-4">ID Discord + pseudo</td><td className="py-2 pr-4">Discord</td><td className="py-2">Liaison compte, whitelist, support</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 pr-4">E-mail</td><td className="py-2 pr-4">Paiement Stripe</td><td className="py-2">Facturation, reçu</td></tr>
              <tr className="border-b border-white/5"><td className="py-2 pr-4">Données de jeu</td><td className="py-2 pr-4">Serveur MC</td><td className="py-2">Progression, inventaire, Pokémon</td></tr>
              <tr><td className="py-2 pr-4">Logs de connexion</td><td className="py-2 pr-4">Serveur</td><td className="py-2">Sécurité, modération</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          <strong>Aucune donnée bancaire</strong> n&apos;est stockée par Cobblenite. Les paiements sont exclusivement
          traités par Stripe (environnement PCI-DSS).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">3. Base légale</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Exécution du contrat</strong> — fourniture du service de jeu et des achats</li>
          <li><strong>Intérêt légitime</strong> — sécurité du serveur, lutte contre la triche</li>
          <li><strong>Consentement</strong> — inscription Discord, abonnement à la newsletter (le cas échéant)</li>
          <li><strong>Obligation légale</strong> — conservation des factures</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">4. Destinataires des données</h2>
        <p>Vos données peuvent être transmises aux sous-traitants suivants :</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Hetzner Online GmbH</strong> (Allemagne) — hébergement du serveur de jeu</li>
          <li><strong>Netlify, Inc.</strong> (USA) — hébergement du site web</li>
          <li><strong>Stripe Payments Europe, Ltd.</strong> (Irlande) — traitement de l&apos;intégralité des paiements</li>
          <li><strong>Discord Inc.</strong> (USA) — plateforme communautaire</li>
          <li><strong>Mojang / Microsoft</strong> — authentification Minecraft</li>
        </ul>
        <p className="mt-2 text-sm text-white/50">
          Les transferts hors UE sont encadrés par les clauses contractuelles types de la Commission européenne.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">5. Durée de conservation</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Données de jeu : tant que le compte reste actif, puis 1 an après la dernière connexion</li>
          <li>Logs techniques : 12 mois maximum</li>
          <li>Données de facturation : 10 ans (obligation légale)</li>
          <li>Données Discord : tant que le compte est présent sur le serveur</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">6. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Droit d&apos;accès</strong> — obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> — corriger une donnée inexacte</li>
          <li><strong>Droit à l&apos;effacement</strong> (« droit à l&apos;oubli »)</li>
          <li><strong>Droit à la limitation</strong> du traitement</li>
          <li><strong>Droit à la portabilité</strong> de vos données</li>
          <li><strong>Droit d&apos;opposition</strong> au traitement</li>
          <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:contact@cobblenite.fr" className="text-blue-400 hover:text-blue-300">contact@cobblenite.fr</a>.
          Une réponse vous sera apportée sous 30 jours maximum.
        </p>
        <p className="mt-2">
          Vous avez également le droit d&apos;introduire une réclamation auprès de la{" "}
          <a href="https://www.cnil.fr" className="text-blue-400 hover:text-blue-300">CNIL</a> (Commission Nationale
          de l&apos;Informatique et des Libertés).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">7. Cookies</h2>
        <p>
          Le site cobblenite.fr utilise un nombre minimal de cookies, uniquement à des fins techniques
          (fonctionnement du site, session de paiement Stripe). Aucun cookie publicitaire ou de traçage tiers
          n&apos;est déposé.
        </p>
        <p className="mt-2">
          Les cookies strictement nécessaires au fonctionnement du service ne nécessitent pas de consentement
          préalable (article 82 Loi Informatique et Libertés).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">8. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
          chiffrement SSL/TLS, authentification SSH par clé, pare-feu UFW, fail2ban, sauvegardes régulières.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">9. Mineurs</h2>
        <p>
          Le service est accessible dès 13 ans. Les mineurs doivent obtenir l&apos;autorisation de leurs représentants
          légaux avant tout achat sur la boutique. Les achats effectués par un mineur sans autorisation peuvent être
          annulés sur demande du représentant légal (preuve à fournir).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">10. Contact</h2>
        <p>
          Responsable du traitement : voir{" "}
          <a href="/mentions-legales" className="text-blue-400 hover:text-blue-300">Mentions légales</a>.<br />
          Contact :{" "}
          <a href="mailto:contact@cobblenite.fr" className="text-blue-400 hover:text-blue-300">contact@cobblenite.fr</a>
        </p>
      </section>
    </LegalLayout>
  );
}
