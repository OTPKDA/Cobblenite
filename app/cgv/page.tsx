import type { Metadata } from "next";
import LegalLayout from "../_components/LegalLayout";

export const metadata: Metadata = {
  title: "CGV — Conditions Générales de Vente — Cobblenite",
  description: "Conditions générales de vente de la boutique Cobblenite : prix, paiement, livraison, rétractation.",
};

export default function CGV() {
  return (
    <LegalLayout title="Conditions Générales de Vente" gradient="from-yellow-400 via-orange-400 to-red-400" lastUpdate="12 avril 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-3">1. Objet</h2>
        <p>
          Les présentes Conditions Générales de Vente (« CGV ») régissent l&apos;ensemble des ventes de biens virtuels
          proposés sur la boutique Cobblenite, accessible depuis le site <strong>cobblenite.fr</strong>.
        </p>
        <p className="mt-2">
          Toute commande implique l&apos;acceptation pleine et entière des présentes CGV.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">2. Nature des produits</h2>
        <p>
          Les produits proposés sont exclusivement des <strong>biens virtuels numériques</strong> utilisables
          uniquement au sein du serveur Minecraft Cobblenite :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Packs d&apos;objets in-game (Starter, Combat, Shiny, Légendaire, Lég. Shiny)</li>
          <li>Grade VIP / VIP+ (avantages communautaires à durée limitée)</li>
          <li>Pokémon spécifiques, items cosmétiques, accessoires</li>
        </ul>
        <p className="mt-2">
          Ces biens n&apos;ont <strong>aucune valeur monétaire réelle</strong>, ne sont pas convertibles en argent et
          ne peuvent être revendus à des tiers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">3. Prix</h2>
        <p>
          Les prix sont affichés en euros (€) toutes taxes comprises (TTC). Les tarifs peuvent être modifiés à tout
          moment, mais les commandes passées restent au prix affiché au moment de l&apos;achat.
        </p>
        <p className="mt-2">Tarifs indicatifs actuels :</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Pack Starter : 6,99 €</li>
          <li>Pack Combat : 14,99 €</li>
          <li>Pack Shiny : 29,99 €</li>
          <li>Pack Légendaire : 49,99 €</li>
          <li>Pack Légendaire Shiny : 59,99 €</li>
          <li>Grade VIP : 4,99 €/mois</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">4. Commande et paiement</h2>
        <p>
          Les paiements sont traités exclusivement par <strong>Stripe Payments Europe, Ltd.</strong>, prestataire
          agréé pour les services de paiement. Les moyens de paiement acceptés sont : Carte Bancaire (Visa,
          Mastercard, American Express), PayPal, et tout autre moyen activé sur Stripe Checkout.
        </p>
        <p className="mt-2">
          Cobblenite ne stocke <strong>aucune donnée bancaire</strong>. La transaction se déroule directement chez
          Stripe, qui garantit un environnement PCI-DSS. L&apos;acheteur doit être majeur (18 ans) ou disposer de
          l&apos;autorisation de son représentant légal.
        </p>
        <p className="mt-2">
          Le contrat est conclu dès la confirmation du paiement par Stripe. Un reçu est envoyé par e-mail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">5. Livraison</h2>
        <p>
          La livraison des biens virtuels est <strong>automatique</strong> et immédiate lors de la connexion du
          joueur sur le serveur, sous réserve que :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Le pseudo Minecraft renseigné soit correct et whitelisté</li>
          <li>Le joueur dispose de place dans son inventaire / PC Pokémon</li>
          <li>Le serveur soit opérationnel</li>
        </ul>
        <p className="mt-2">
          En cas de non-livraison après 24h, contactez le support via Discord (ticket) ou à{" "}
          <a href="mailto:contact@cobblenite.fr" className="text-blue-400 hover:text-blue-300">contact@cobblenite.fr</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">6. Droit de rétractation</h2>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 my-3">
          <p>
            <strong>Important :</strong> conformément à l&apos;article <strong>L221-28 1° et 13°</strong> du Code de
            la consommation, le droit de rétractation de 14 jours <strong>ne s&apos;applique pas</strong> aux
            contenus numériques fournis immédiatement après le paiement.
          </p>
          <p className="mt-2">
            En validant votre commande, vous demandez expressément la livraison immédiate du bien numérique et
            renoncez à votre droit de rétractation.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">7. Remboursement</h2>
        <p>
          Aucun remboursement n&apos;est accordé à la suite d&apos;une livraison effective, sauf cas exceptionnels
          appréciés à la seule discrétion de l&apos;équipe (erreur technique avérée, double paiement, bien non
          livré).
        </p>
        <p className="mt-2">
          Aucun remboursement n&apos;est accordé en cas de :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Bannissement pour non-respect des CGU</li>
          <li>Perte d&apos;objets in-game (mort, dépôt public, échange, mauvaise manipulation)</li>
          <li>Wipe du serveur, changement de version, arrêt du service</li>
          <li>Regret d&apos;achat</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">8. Abonnement VIP</h2>
        <p>
          Le grade VIP est facturé mensuellement (4,99 €/mois) via Stripe. L&apos;abonnement peut être annulé à tout
          moment en contactant le support Discord ou par e-mail. L&apos;annulation prend effet à la fin de la période
          déjà payée et les avantages restent actifs jusqu&apos;à cette date.
        </p>
        <p className="mt-2">
          Aucun remboursement prorata n&apos;est effectué pour une période déjà facturée.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">9. Responsabilité</h2>
        <p>
          Cobblenite étant un projet communautaire, aucune garantie n&apos;est apportée sur la pérennité du serveur
          ni sur la conservation des biens achetés. En cas d&apos;arrêt du service, aucun remboursement ne pourra
          être exigé pour les biens non consommés.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-3">10. Médiation et litiges</h2>
        <p>
          Avant toute procédure, le client s&apos;engage à contacter le support Cobblenite via Discord ou e-mail.
        </p>
        <p className="mt-2">
          Conformément à l&apos;article L612-1 du Code de la consommation, le consommateur peut recourir
          gratuitement à un médiateur de la consommation. Les litiges non résolus à l&apos;amiable sont soumis aux
          tribunaux français compétents.
        </p>
        <p className="mt-2">
          Plateforme européenne de règlement en ligne des litiges :{" "}
          <a href="https://ec.europa.eu/consumers/odr" className="text-blue-400 hover:text-blue-300">ec.europa.eu/consumers/odr</a>
        </p>
      </section>
    </LegalLayout>
  );
}
