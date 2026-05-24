import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQ } from '../../core/models/faq.model';
import { FaqService } from '../../core/services/faq.service';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, AfterViewInit {
  faqs: FAQ[] = [];
  activeFaq: number | null = null;

  defaultFaqs: FAQ[] = [
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les délais varient selon le pack choisi : 7 jours pour le Pack Starter, 14 jours pour le Pack Business, et 21 jours pour les projets e-commerce. Nous nous engageons à respecter ces délais.',
      category: 'Général',
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Proposez-vous la maintenance après la livraison ?',
      answer: 'Oui ! Tous nos packs incluent une période de garantie. Nous proposons également des contrats de maintenance mensuels pour assurer le bon fonctionnement et les mises à jour de votre site.',
      category: 'Général',
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: 'Nous acceptons le paiement par Mobile Money (Orange Money, MTN Mobile Money, Wave) et par virement bancaire. Un acompte de 50% est demandé au démarrage du projet.',
      category: 'Paiement',
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Puis-je modifier mon site après la livraison ?',
      answer: 'Absolument ! Nous vous fournissons une interface d\'administration intuitive qui vous permet de modifier le contenu de votre site facilement, sans connaissances techniques.',
      category: 'Technique',
      order: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Le référencement SEO est-il inclus ?',
      answer: 'Oui, tous nos packs incluent une optimisation SEO de base. Les packs supérieurs bénéficient d\'un SEO avancé avec recherche de mots-clés, optimisation des balises meta et création de sitemap.',
      category: 'Technique',
      order: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor(private faqService: FaqService) {}

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.faqService.getActive().subscribe({
      next: (faqs) => {
        this.faqs = faqs.length > 0 ? faqs : this.defaultFaqs;
      },
      error: () => {
        this.faqs = this.defaultFaqs;
      }
    });
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  ngAfterViewInit() {
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 200
    });
  }
}
