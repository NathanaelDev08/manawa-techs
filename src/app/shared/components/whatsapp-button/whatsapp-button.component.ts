import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css']
})
export class WhatsAppButtonComponent {
  phoneNumber = '2250707638916';
  message = 'Bonjour MANAWA TECHS ! Je souhaite avoir plus d\'informations sur vos services.';
  
  get whatsappLink(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
  }
}
