import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';

  contactInfo = [
    { icon: 'fas fa-phone', label: 'Téléphone', value: '+225 07 07 63 89 16', link: 'tel:+2250707638916' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'contact@manawatechs.com', link: 'mailto:contact@manawatechs.com' },
    { icon: 'fas fa-map-marker-alt', label: 'Adresse', value: 'Abidjan, Côte d\'Ivoire', link: '#' }
  ];

  constructor(private contactService: ContactService) {}

  async submitForm() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      await this.contactService.create(this.contactForm);
      this.isSuccess = true;
      this.contactForm = { name: '', email: '', phone: '', subject: '', message: '' };
      
      setTimeout(() => {
        this.isSuccess = false;
      }, 5000);
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    } finally {
      this.isSubmitting = false;
    }
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
