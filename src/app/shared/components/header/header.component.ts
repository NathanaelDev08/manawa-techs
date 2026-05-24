import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header', standalone: true, imports: [CommonModule],
  templateUrl: './header.component.html', styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isScrolled = signal(false); isMenuOpen = signal(false);
  whatsapp = '2250797969475';
  @HostListener('window:scroll') onScroll() { this.isScrolled.set(window.scrollY > 30); }
  toggleMenu() { this.isMenuOpen.update(v => !v); }
  scrollTo(id: string) { this.isMenuOpen.set(false); document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); }
}
