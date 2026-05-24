import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { DataService } from '../../core/services/data.service';
import { Pack } from '../../core/models/manawa.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private data = inject(DataService);
  founder = this.data.getFounder();
  services = this.data.getServices();
  packs = this.data.getPacks();
  faqItems = this.data.getFAQ();
  openFaq = signal<number | null>(null);
  whatsapp = '2250797969475';

  packCategories = signal<{name:string; packs:Pack[]}[]>(
    [...new Set(this.packs.map(p=>p.categoryName))].map(name=>({name, packs:this.packs.filter(p=>p.categoryName===name)}))
  );

  toggleFaq(i:number) { this.openFaq.set(this.openFaq()===i?null:i); }
  scrollTo(id:string) { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); }
  
  contactWA(pack?:string) {
    const msg = pack ? `Bonjour Manawa Techs! Je suis intéressé par le pack: ${pack}` : 'Bonjour Manawa Techs! Je souhaite plus d\'informations.';
    window.open(`https://wa.me/${this.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
  }
}
