import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-public-site',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-site.component.html',
  styleUrls: []
})
export class PublicSiteComponent implements AfterViewInit {
  services = [
    { icon: 'fas fa-project-diagram', title: 'Odoo & ERP', desc: 'Déploiement de modules Ventes, Stocks, Comptabilité et CRM.' },
    { icon: 'fas fa-server', title: 'Admin. Systèmes', desc: 'Installation et sécurisation de serveurs Windows et Linux.' },
    { icon: 'fas fa-print', title: 'Imprimerie Numérique', desc: 'Impression grand format Bâche, Vinyle, One-Way.' },
    { icon: 'fas fa-code', title: 'Développement Web', desc: 'Sites vitrines et applications métiers sur mesure.' },
    { icon: 'fas fa-shield-alt', title: 'Sécurité & Réseaux', desc: 'VPN, pare-feu et optimisation réseau.' },
    { icon: 'fas fa-graduation-cap', title: 'Formation & Coaching', desc: 'Transfert de compétences IT et design.' }
  ];

  techStack = ['Odoo ERP', 'Linux & Windows Server', 'Windev / Webdev', 'Imprimerie Numérique', 'Virtualisation', 'Graphisme (Adobe)', 'Intelligence Artificielle', 'Infrastructure Cloud'];

  faqs = [
    { q: 'Pourquoi choisir Odoo pour mon entreprise en Côte d\'Ivoire ?', a: 'Odoo est un ERP tout-en-un ultra-flexible qui centralise ventes, stocks et comptabilité.' },
    { q: 'Quels sont les délais pour une impression grand format ?', a: 'Délais de 24h à 72h selon la complexité. Service express disponible.' },
    { q: 'Proposez-vous des solutions d\'Intelligence Artificielle ?', a: 'Oui : OCR, analyse prédictive, Chatbots intelligents pour votre service client.' },
    { q: 'Comment fonctionne le support technique après livraison ?', a: 'Support réactif via WhatsApp, accès à distance ou intervention sur site.' },
    { q: 'Formez-vous les équipes aux outils numériques ?', a: 'Absolument. Formation Odoo, cybersécurité et outils collaboratifs.' }
  ];

  isSticky = false;
  showBackToTop = false;
  activeFaqIndex: number | null = null;
  showLoader = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isSticky = window.scrollY > 30;
    this.showBackToTop = window.scrollY > 300;
  }

  ngAfterViewInit() {
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal({ origin: 'bottom', distance: '40px', duration: 1200, reset: false, mobile: true });
      sr.reveal('.hero-content', { origin: 'left', delay: 200 });
      sr.reveal('.founder-card', { delay: 300 });
      sr.reveal('.card', { interval: 100 });
      sr.reveal('.faq-item', { interval: 80 });
    }
  }

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handlePackClick(event: Event, packName: string, packPrice: string) {
    event.preventDefault();
    const message = encodeURIComponent(`👋 Bonjour Manawa Techs!\n\nPack: ${packName}\n💰 ${packPrice}\n\nPlus d'infos svp ?`);
    window.open(`https://wa.me/2250797969475?text=${message}`, '_blank');
  }

  packCategories = [
    {
      icon: 'fas fa-tools', title: 'Maintenance & Dépannage Express',
      packs: [
        { name: 'Pack Dépannage Rapid', price: '5 000 CFA', features: ['Diagnostic à distance', 'Solution simple', 'Assistance 30min'] },
        { name: 'Pack Nettoyage PC', price: '7 500 CFA', features: ['Nettoyage physique', 'Dépoussiérage interne', 'Nettoyage logiciel'] },
        { name: 'Pack Accélération PC', price: '9 000 CFA', features: ['Désactivation programmes', 'Optimisation démarrage', 'Défragmentation'] },
        { name: 'Pack Suppression Virus', price: '12 000 CFA', features: ['Scan antivirus', 'Suppression malwares', 'Installation antivirus'] },
        { name: 'Pack Récupération Fichiers', price: '15 000 CFA', features: ['Récupération données', 'Restauration 5Go', 'Logiciel inclus'] },
        { name: 'Pack Installation Pilotes', price: '6 000 CFA', features: ['Détection pilotes', 'Installation à jour', 'Test périphériques'] },
        { name: 'Pack Sauvegarde Express', price: '8 000 CFA', features: ['Sauvegarde 10Go', 'Configuration auto', 'Support cloud/USB'] },
        { name: 'Pack Réseau Wifi', price: '10 000 CFA', features: ['Optimisation signal', 'Configuration routeur', 'Sécurisation'] }
      ]
    },
    {
      icon: 'fas fa-laptop', title: 'Logiciels & Bureautique',
      packs: [
        { name: 'Pack Installation Office', price: '7 000 CFA', features: ['Word/Excel/PowerPoint', 'Activation', 'Configuration email'] },
        { name: 'Pack Adobe Reader/PDF', price: '3 000 CFA', features: ['Installation lecteur', 'Configuration impression', 'Formation 30min'] },
        { name: 'Pack Navigateur Internet', price: '2 500 CFA', features: ['Chrome/Firefox', 'Page d\'accueil', 'Bloqueur pub'] },
        { name: 'Pack Messagerie Outlook', price: '10 000 CFA', features: ['Configuration email', 'Synchro calendrier', 'Règles/filtres'] },
        { name: 'Pack Compression fichiers', price: '2 000 CFA', features: ['WinRAR/7-Zip', 'Création zip/rar', 'Extraction'] },
        { name: 'Pack Traduction/Traitement', price: '5 000 CFA', features: ['Logiciel traduction', 'OCR simple', 'Formation 30min'] }
      ]
    },
    {
      icon: 'fas fa-user-graduate', title: 'Étudiants & Particuliers',
      packs: [
        { name: 'Pack Prise en main PC', price: '6 000 CFA', features: ['Bases Windows', 'Internet', 'Conseils sécurité'] },
        { name: 'Pack Rédaction CV', price: '5 000 CFA', features: ['Modèle CV moderne', 'Mise en page Word', 'Export PDF'] },
        { name: 'Pack Préparation Exposé', price: '7 500 CFA', features: ['PowerPoint', 'Recherche images', 'Mise en forme'] },
        { name: 'Pack Gestion Budget', price: '6 000 CFA', features: ['Tableur Excel', 'Formules', 'Graphiques'] },
        { name: 'Pack Cours en ligne', price: '7 000 CFA', features: ['Zoom/Meet', 'Audio/vidéo', 'Enregistrement'] },
        { name: 'Pack Réseaux sociaux', price: '4 000 CFA', features: ['Facebook/WhatsApp', 'Confidentialité', 'Basique'] }
      ]
    },
    {
      icon: 'fas fa-store', title: 'TPE & Commerçants',
      packs: [
        { name: 'Pack Facture Simple', price: '12 000 CFA', features: ['Modèle facture', 'Calcul TVA', 'Impression'] },
        { name: 'Pack Gestion Stock', price: '15 000 CFA', features: ['Tableur inventaire', 'Alertes stock bas', 'Suivi'] },
        { name: 'Pack Caisse enregistreuse', price: '10 000 CFA', features: ['Logiciel caisse', 'Formation rapide', 'Support 1 mois'] },
        { name: 'Pack Devis pro', price: '8 000 CFA', features: ['Modèle devis', 'Conversion facture', 'Impression'] },
        { name: 'Pack Communication', price: '10 000 CFA', features: ['Flyer Canva', '50 impressions', 'Livraison'] }
      ]
    },
    {
      icon: 'fas fa-project-diagram', title: 'Solutions Odoo & ERP',
      packs: [
        { name: 'Pack Odoo Start', price: '150 000 CFA', features: ['Installation Odoo', '2 modules', 'Formation 2h', 'Support 1 mois'] },
        { name: 'Pack Odoo Business', price: '450 000 CFA', features: ['Audit complet', '5 modules', 'Hébergement 6 mois', 'Formation 8h', 'Support 6 mois'], featured: true, featuredLabel: 'POPULAIRE' },
        { name: 'Pack Odoo Enterprise', price: 'Sur Devis', features: ['Sur mesure', 'API', 'Migration', 'Hébergement dédié', 'Support 12 mois'] }
      ]
    },
    {
      icon: 'fas fa-robot', title: 'Intelligence Artificielle',
      packs: [
        { name: 'Pack IA Découverte', price: '75 000 CFA', features: ['Audit IA', 'Solutions', 'Outils base', 'Workshop 2h'] },
        { name: 'Pack IA Automatisation', price: '250 000 CFA', features: ['Chatbot', 'Auto emails', 'OCR', 'Intégration Odoo', 'Formation 4h'] },
        { name: 'Pack IA Avancé', price: 'Sur Devis', features: ['Analyse prédictive', 'Reconnaissance image', 'Modèles personnalisés', 'Support avancé'] }
      ]
    },
    {
      icon: 'fas fa-print', title: 'Imprimerie Numérique',
      packs: [
        { name: 'Pack Identité Visuelle', price: '75 000 CFA', features: ['Logo Premium', 'Cartes Visite', 'Maquette Bâche', 'Fichiers Sources'] },
        { name: 'Pack Signalétique', price: '120 000 CFA', features: ['2 Bâches 3x2m', '10 Stickers', '50 Flyers', 'Installation'] },
        { name: 'Pack Événementiel', price: '200 000 CFA', features: ['Roll-up', 'Kakémono', '100 Flyers', 'Design complet', 'Livraison express'] }
      ]
    },
    {
      icon: 'fas fa-laptop-code', title: 'Web & Infrastructure',
      packs: [
        { name: 'Pack Site Vitrine', price: '250 000 CFA', features: ['Site 5 pages', 'Responsive', 'Hébergement 1 an', 'Domaine .ci', 'Formulaire'] },
        { name: 'Pack Maintenance IT', price: '45 000 fcfa/mois', features: ['Maintenance', 'Support', 'Sauvegardes', 'Sécurité', 'Urgence'] },
        { name: 'Pack Infra Cloud', price: '95 000 fcfa/mois', features: ['Serveur dédié', 'Sauvegarde auto', '24/7', 'SSL', 'Support avancé'] }
      ]
    },
    {
      icon: 'fas fa-graduation-cap', title: 'Formation & Accompagnement',
      packs: [
        { name: 'Pack Formation Odoo', price: '80 000 fcfa/pers.', features: ['Formation 8h', 'Support après', 'Supports', 'E-learning'] },
        { name: 'Pack Initiation Info', price: '45 000 fcfa/pers.', features: ['Découverte', 'Windows/macOS', 'Fichiers', 'Internet'] },
        { name: 'Pack Suite Office', price: '65 000 fcfa/pers.', features: ['Word', 'Excel', 'PowerPoint', 'Outlook'] },
        { name: 'Pack Installation OS', price: '35 000 fcfa', features: ['Windows 10/11', 'Linux', 'Pilotes', 'Support'] },
        { name: 'Pack Logiciels & Config', price: '25 000 fcfa', features: ['Antivirus', 'Bureautique', 'Logiciels métier'] },
        { name: 'Pack Clé Bootable', price: '15 000 fcfa', features: ['Clé USB', 'Outils', 'Tutoriel'] },
        { name: 'Pack Formation Sur-Mesure', price: 'Sur Devis', features: ['Programme adapté', 'Formateur dédié', 'Thèmes au choix'], featured: true, featuredLabel: 'SUR-MESURE' }
      ]
    }
  ];
}
