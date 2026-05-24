import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import ScrollReveal from 'scrollreveal';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- SITE PUBLIC SEULEMENT (Admin = pages HTML séparées) -->
    <div class="capture-loader" [class.show]="showLoader">
      <div class="loader-content"><div class="loader-spinner"></div><p>Préparation...</p></div>
    </div>
    <a href="https://wa.me/2250797969475" class="whatsapp-float" target="_blank"><i class="fab fa-whatsapp"></i></a>
    <button class="back-to-top" [class.show]="showBackToTop" (click)="scrollToTop()"><i class="fas fa-arrow-up"></i></button>
    
    <header [class.sticky]="isSticky">
      <a href="#accueil" class="logo">MANAWA <span>TECHS</span></a>
      <nav class="nav-links">
        <a href="#accueil">Accueil</a>
        <a href="#fondateur">Fondateur</a>
        <a href="#expertises">Expertises</a>
        <a href="#tarifs">Packs</a>
        <a href="#faq">FAQ</a>
        <a href="#contact" class="btn-cta-nav">Contact</a>
      </nav>
    </header>

    <section id="accueil" class="hero">
      <div class="hero-content">
        <span style="font-family:'Playfair Display'; font-style:italic; color:var(--primary-orange); font-size:1.1rem;">L'aide-informatique de votre transformation digitale</span>
        <h1>L'architecture de votre Succès Numérique</h1>
        <p>Leader en intégration Odoo, administration systèmes et imprimerie numérique en Côte d'Ivoire.</p>
        <div class="hero-btns">
          <a href="#expertises" class="btn btn-primary" style="background:var(--primary-orange); color:white; padding:14px 30px;">Nos Services</a>
          <a href="#contact" style="color:white; font-weight:600; text-decoration:none;">Discutons du projet <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
      <div class="hero-img"></div>
    </section>

    <section id="fondateur"><div class="founder-card"><div class="founder-img-box"><div class="founder-img"><i class="fas fa-user-tie"></i></div><div class="badge-founder">Fondateur</div></div><div class="founder-info"><h2>Nathanael Kouassi</h2><p style="color:var(--gray);">Expert IT avec Licence en Informatique.</p><h4 style="color:var(--primary-blue);">Maîtrise Technologique :</h4><div class="tech-stack">@for (t of techStack; track t) {<div class="tech-item">{{t}}</div>}</div></div></div></section>

    <section id="expertises" style="background:#f0f4f4;">
      <div class="section-title"><h2>Nos Expertises</h2><div class="bar"></div></div>
      <div class="grid-box">@for (s of services; track s.title) {<div class="card"><i [class]="s.icon"></i><h3>{{s.title}}</h3><p>{{s.desc}}</p></div>}</div>
    </section>

    <section id="tarifs">
      <div class="section-title"><h2>+35 Packs de Services</h2><div class="bar"></div></div>
      @for (cat of packCategories; track cat.title) {
        <div class="pack-category"><h3><i [class]="cat.icon"></i> {{cat.title}}</h3>
          <div class="packs-container">
            @for (p of cat.packs; track p.name) {
              <div class="card price-card" [class.featured]="p.featured">
                @if (p.featured) {<div style="background:var(--primary-orange); color:white; position:absolute; top:15px; right:-35px; transform:rotate(45deg); width:150px; font-size:0.75rem; font-weight:bold; padding:6px 0; text-align:center;">{{p.featuredLabel}}</div>}
                <h4 [style.color]="p.featured ? 'var(--primary-orange)' : 'var(--primary-blue)'">{{p.name}}</h4>
                <div class="price">{{p.price}}</div>
                <ul>@for (f of p.features; track f) {<li><i class="fas fa-check-circle"></i> {{f}}</li>}</ul>
                <a href="#" class="btn btn-primary" style="display:block; text-align:center; margin-top:15px;" [style.background]="p.featured ? 'var(--primary-orange)' : 'var(--primary-blue)'" (click)="handlePackClick($event, p.name, p.price)">Commander</a>
              </div>
            }
          </div>
        </div>
      }
    </section>

    <section id="faq" style="background:#fff;">
      <div class="section-title"><h2>FAQ</h2><div class="bar"></div></div>
      <div class="faq-container">
        @for (f of faqs; track f.q; let i = $index) {
          <div class="faq-item" [class.active]="activeFaqIndex === i">
            <button class="faq-question" (click)="toggleFaq(i)">{{f.q}}<i class="fas fa-chevron-down"></i></button>
            <div class="faq-answer"><p>{{f.a}}</p></div>
          </div>
        }
      </div>
    </section>

    <footer id="contact">
      <div class="footer-grid">
        <div class="footer-col"><a class="logo" style="color:white;">MANAWA <span>TECHS</span></a><p>L'excellence technologique au service du terrain ivoirien.</p></div>
        <div class="footer-col"><h4>Navigation</h4><a href="#fondateur">À propos</a><a href="#expertises">Expertises</a><a href="#tarifs">Packs</a><a href="#faq">FAQ</a></div>
        <div class="footer-col"><h4>Contact</h4><p><i class="fab fa-whatsapp" style="color:var(--whatsapp);"></i> +225 07 97 96 94 75</p><p><i class="fas fa-envelope"></i> contact&#64;manawatechs.ci</p></div>
      </div>
      <div style="text-align:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:25px; margin-top:40px;"><p>&copy; 2026 MANAWA TECHS</p></div>
    </footer>
  `
})
export class AppComponent implements AfterViewInit {
  isSticky = false;
  showBackToTop = false;
  activeFaqIndex: number | null = null;
  showLoader = false;

  services = [
    { icon: 'fas fa-project-diagram', title: 'Odoo & ERP', desc: 'Déploiement modules Ventes, Stocks, Comptabilité et CRM.' },
    { icon: 'fas fa-server', title: 'Admin. Systèmes', desc: 'Installation et sécurisation serveurs Windows et Linux.' },
    { icon: 'fas fa-print', title: 'Imprimerie Numérique', desc: 'Impression grand format Bâche, Vinyle, One-Way.' },
    { icon: 'fas fa-code', title: 'Développement Web', desc: 'Sites vitrines et applications métiers sur mesure.' },
    { icon: 'fas fa-shield-alt', title: 'Sécurité & Réseaux', desc: 'VPN, pare-feu et optimisation réseau.' },
    { icon: 'fas fa-graduation-cap', title: 'Formation & Coaching', desc: 'Transfert compétences IT et design.' }
  ];

  techStack = ['Odoo ERP', 'Linux & Windows Server', 'Windev / Webdev', 'Imprimerie Numérique', 'Virtualisation', 'Graphisme (Adobe)', 'IA', 'Cloud'];

  faqs = [
    { q: 'Pourquoi choisir Odoo ?', a: 'Odoo est un ERP tout-en-un qui centralise ventes, stocks et comptabilité.' },
    { q: 'Délais impression grand format ?', a: '24h à 72h. Service express disponible.' },
    { q: 'Solutions IA proposées ?', a: 'OCR, chatbots intelligents, analyse prédictive.' },
    { q: 'Support technique ?', a: 'WhatsApp, accès à distance, intervention sur site.' },
    { q: 'Formation équipes ?', a: 'Oui, Odoo, cybersécurité et outils collaboratifs.' }
  ];

  packCategories = [
    { icon: 'fas fa-tools', title: 'Maintenance & Dépannage', packs: [
      { name: 'Pack Dépannage Rapid', price: '5 000 CFA', features: ['Diagnostic', 'Solution simple', 'Assistance 30min'] },
      { name: 'Pack Nettoyage PC', price: '7 500 CFA', features: ['Nettoyage', 'Dépoussiérage', 'Logiciel'] },
      { name: 'Pack Suppression Virus', price: '12 000 CFA', features: ['Scan', 'Suppression', 'Antivirus'] }
    ]},
    { icon: 'fas fa-project-diagram', title: 'Odoo & ERP', packs: [
      { name: 'Pack Odoo Start', price: '150 000 CFA', features: ['Installation', '2 modules', 'Formation 2h'] },
      { name: 'Pack Odoo Business', price: '450 000 CFA', features: ['Audit', '5 modules', 'Hébergement 6 mois'], featured: true, featuredLabel: 'POPULAIRE' },
      { name: 'Pack Odoo Enterprise', price: 'Sur Devis', features: ['Sur mesure', 'API', 'Support 12 mois'] }
    ]},
    { icon: 'fas fa-print', title: 'Imprimerie', packs: [
      { name: 'Pack Identité Visuelle', price: '75 000 CFA', features: ['Logo', 'Cartes', 'Bâche'] },
      { name: 'Pack Signalétique', price: '120 000 CFA', features: ['2 Bâches', 'Stickers', 'Flyers'] }
    ]}
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isSticky = window.scrollY > 30;
    this.showBackToTop = window.scrollY > 300;
  }

  ngAfterViewInit() {
    if (typeof ScrollReveal !== 'undefined') {
      ScrollReveal({ origin: 'bottom', distance: '40px', duration: 1200 })
        .reveal('.hero-content', { origin: 'left', delay: 200 })
        .reveal('.founder-card', { delay: 300 })
        .reveal('.card', { interval: 100 });
    }
  }

  toggleFaq(index: number) { this.activeFaqIndex = this.activeFaqIndex === index ? null : index; }
  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  handlePackClick(e: Event, name: string, price: string) {
    e.preventDefault();
    window.open(`https://wa.me/2250797969475?text=${encodeURIComponent(`👋 Pack: ${name} - ${price}`)}`, '_blank');
  }
}
