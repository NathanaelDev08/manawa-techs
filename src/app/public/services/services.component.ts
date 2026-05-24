import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../core/models/service.model';
import { FirebaseCrudService } from '../../core/services/firebase-crud.service';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services: Service[] = [];

  defaultServices = [
    {
      title: 'Création de Sites Web',
      description: 'Sites vitrines, e-commerce et applications web sur mesure avec les dernières technologies.',
      icon: 'fas fa-globe',
      features: ['Design responsive', 'SEO optimisé', 'Performance maximale', 'Maintenance incluse']
    },
    {
      title: 'Applications Web',
      description: 'Applications web progressives (PWA) rapides, fiables et engageantes.',
      icon: 'fas fa-code',
      features: ['PWA', 'Hors ligne', 'Push notifications', 'Multi-plateforme']
    },
    {
      title: 'E-commerce',
      description: 'Boutiques en ligne complètes avec paiement sécurisé et gestion des stocks.',
      icon: 'fas fa-shopping-cart',
      features: ['Paiement mobile money', 'Gestion stocks', 'Tableau de bord', 'Facturation']
    },
    {
      title: 'SEO & Référencement',
      description: 'Optimisation pour les moteurs de recherche afin d\'augmenter votre visibilité.',
      icon: 'fas fa-search',
      features: ['Audit SEO', 'Mots-clés', 'Backlinks', 'Rapports mensuels']
    },
    {
      title: 'Design Graphique',
      description: 'Identité visuelle complète : logos, chartes graphiques, maquettes.',
      icon: 'fas fa-paint-brush',
      features: ['Logo design', 'Charte graphique', 'Maquettes UI/UX', 'Réseaux sociaux']
    },
    {
      title: 'Social Media',
      description: 'Gestion de vos réseaux sociaux et création de contenu engageant.',
      icon: 'fas fa-hashtag',
      features: ['Création contenu', 'Community management', 'Publicités', 'Analytique']
    }
  ];

  constructor(private firebaseCrud: FirebaseCrudService) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.firebaseCrud.getActive('services').subscribe({
      next: (services) => {
        this.services = services.length > 0 ? services : this.defaultServices as any;
      },
      error: () => {
        this.services = this.defaultServices as any;
      }
    });
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
