import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Paramètres du site</h1>
    <div class="bg-white rounded-xl p-6 shadow-sm border max-w-2xl">
      <div class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Nom du site</label>
          <input [(ngModel)]="settings.siteName" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm mb-1">Email de contact</label>
          <input [(ngModel)]="settings.email" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm mb-1">Téléphone</label>
          <input [(ngModel)]="settings.phone" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm mb-1">WhatsApp</label>
          <input [(ngModel)]="settings.whatsapp" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm mb-1">Adresse</label>
          <input [(ngModel)]="settings.address" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div><label class="block text-sm mb-1">Facebook</label><input [(ngModel)]="settings.facebook" class="w-full px-3 py-2 border rounded-lg"></div>
          <div><label class="block text-sm mb-1">Instagram</label><input [(ngModel)]="settings.instagram" class="w-full px-3 py-2 border rounded-lg"></div>
          <div><label class="block text-sm mb-1">LinkedIn</label><input [(ngModel)]="settings.linkedin" class="w-full px-3 py-2 border rounded-lg"></div>
          <div><label class="block text-sm mb-1">TikTok</label><input [(ngModel)]="settings.tiktok" class="w-full px-3 py-2 border rounded-lg"></div>
        </div>
        <button (click)="save()" class="text-white px-6 py-2.5 rounded-lg font-medium" style="background:#FF8C1A;">
          <i class="fas fa-save mr-2"></i> Enregistrer
        </button>
      </div>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  settings: any = {};
  constructor(private storage: StorageService) {}
  ngOnInit() {
    const saved = this.storage.getItem('settings');
    this.settings = saved || {
      siteName: 'MANAWA TECHS', email: 'contact@manawatechs.ci',
      phone: '+225 07 97 96 94 75', whatsapp: '2250797969475',
      address: 'San-Pedro / Abidjan, CI', facebook: '', instagram: '', linkedin: '', tiktok: ''
    };
  }
  save() { this.storage.setItem('settings', this.settings); alert('✅ Paramètres enregistrés !'); }
}
