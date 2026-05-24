import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pack } from '../../core/models/pack.model';
import { PackService } from '../../core/services/pack.service';
import ScrollReveal from 'scrollreveal';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css']
})
export class PacksComponent implements OnInit, AfterViewInit {
  packs: Pack[] = [];
  filteredPacks: Pack[] = [];
  categories: string[] = ['TOUS', 'SITE VITRINE', 'E-COMMERCE', 'APPLICATION WEB', 'SEO', 'DESIGN', 'SOCIAL MEDIA'];
  activeCategory = 'TOUS';
  selectedPack: Pack | null = null;
  showModal = false;

  defaultPacks: Pack[] = [
    {
      name: 'Pack Starter',
      category: 'SITE VITRINE',
      description: 'Site vitrine one-page parfait pour les petites entreprises',
      shortDescription: 'Idéal pour débuter en ligne',
      price: 150000,
      originalPrice: 200000,
      features: [
        { name: 'Site one-page responsive', included: true },
        { name: 'Formulaire de contact', included: true },
        { name: 'Optimisation SEO de base', included: true },
        { name: 'Hébergement 1 an offert', included: true },
        { name: 'Nom de domaine .ci', included: true },
        { name: 'E-commerce', included: false },
        { name: 'Application mobile', included: false }
      ],
      isPopular: false,
      isActive: true,
      deliveryDays: 7,
      whatsappMessage: 'Bonjour, je suis intéressé par le Pack Starter',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pack Business',
      category: 'SITE VITRINE',
      description: 'Site vitrine complet multi-pages pour les entreprises',
      shortDescription: 'Solution complète pour votre entreprise',
      price: 300000,
      originalPrice: 400000,
      features: [
        { name: 'Site multi-pages (5 pages)', included: true },
        { name: 'Design personnalisé', included: true },
        { name: 'Formulaire de contact avancé', included: true },
        { name: 'SEO avancé', included: true },
        { name: 'Hébergement 1 an', included: true },
        { name: 'Nom de domaine .ci', included: true },
        { name: 'Chat en direct', included: true }
      ],
      isPopular: true,
      isActive: true,
      deliveryDays: 14,
      whatsappMessage: 'Bonjour, je suis intéressé par le Pack Business',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pack E-commerce',
      category: 'E-COMMERCE',
      description: 'Boutique en ligne complète avec paiement mobile money',
      shortDescription: 'Vendez en ligne facilement',
      price: 500000,
      features: [
        { name: 'Boutique en ligne complète', included: true },
        { name: 'Paiement mobile money', included: true },
        { name: 'Gestion des stocks', included: true },
        { name: 'Panel admin', included: true },
        { name: 'SEO e-commerce', included: true },
        { name: 'Formation incluse', included: true },
        { name: 'Support prioritaire', included: true }
      ],
      isPopular: false,
      isActive: true,
      deliveryDays: 21,
      whatsappMessage: 'Bonjour, je suis intéressé par le Pack E-commerce',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor(private packService: PackService) {}

  ngOnInit() {
    this.loadPacks();
  }

  loadPacks() {
    this.packService.getActive().subscribe({
      next: (packs) => {
        this.packs = packs.length > 0 ? packs : this.defaultPacks;
        this.filterPacks();
      },
      error: () => {
        this.packs = this.defaultPacks;
        this.filterPacks();
      }
    });
  }

  filterPacks() {
    if (this.activeCategory === 'TOUS') {
      this.filteredPacks = this.packs;
    } else {
      this.filteredPacks = this.packs.filter(p => p.category === this.activeCategory);
    }
  }

  setCategory(category: string) {
    this.activeCategory = category;
    this.filterPacks();
  }

  openPackDetails(pack: Pack) {
    this.selectedPack = pack;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPack = null;
  }

  async captureAndShare(pack: Pack) {
    const element = document.getElementById(`pack-${pack.name}`);
    if (element) {
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');
      const message = encodeURIComponent(pack.whatsappMessage + ` (${pack.price.toLocaleString()} FCFA)`);
      window.open(`https://wa.me/2250707638916?text=${message}`, '_blank');
    }
  }

  getWhatsAppLink(pack: Pack): string {
    const message = encodeURIComponent(pack.whatsappMessage + ` - ${pack.price.toLocaleString()} FCFA`);
    return `https://wa.me/2250707638916?text=${message}`;
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
