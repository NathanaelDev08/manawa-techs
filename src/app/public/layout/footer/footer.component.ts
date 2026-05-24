import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'fab fa-facebook-f', url: '#', label: 'Facebook' },
    { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
    { icon: 'fab fa-linkedin-in', url: '#', label: 'LinkedIn' },
    { icon: 'fab fa-tiktok', url: '#', label: 'TikTok' },
    { icon: 'fab fa-youtube', url: '#', label: 'YouTube' }
  ];

  quickLinks = [
    { label: 'Accueil', url: '/#home' },
    { label: 'Services', url: '/#services' },
    { label: 'Packs', url: '/#packs' },
    { label: 'FAQ', url: '/#faq' },
    { label: 'Contact', url: '/#contact' }
  ];

  services = [
    'Création de sites web',
    'Applications web',
    'E-commerce',
    'SEO & Référencement',
    'Design graphique',
    'Social Media'
  ];
}
