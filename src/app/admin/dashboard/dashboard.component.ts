import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Tableau de bord</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Packs</p>
              <p class="text-3xl font-bold" style="color:#FF8C1A;">{{ stats.packs }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background:#FFF3E6;">
              <i class="fas fa-box text-xl" style="color:#FF8C1A;"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Services</p>
              <p class="text-3xl font-bold" style="color:#0066CC;">{{ stats.services }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background:#E6F0FF;">
              <i class="fas fa-cogs text-xl" style="color:#0066CC;"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">FAQs</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.faqs }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
              <i class="fas fa-question-circle text-xl text-green-600"></i>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Messages</p>
              <p class="text-3xl font-bold text-purple-600">{{ stats.contacts }}</p>
            </div>
            <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100">
              <i class="fas fa-envelope text-xl text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4">Accès rapides</h3>
          <div class="grid grid-cols-2 gap-3">
            <a routerLink="/admin/packs" class="p-4 rounded-xl text-center border border-gray-200 hover:border-orange-400 transition-all">
              <i class="fas fa-box text-2xl mb-2" style="color:#FF8C1A;"></i>
              <p class="text-sm font-medium">Gérer les packs</p>
            </a>
            <a routerLink="/admin/services" class="p-4 rounded-xl text-center border border-gray-200 hover:border-blue-400 transition-all">
              <i class="fas fa-cogs text-2xl mb-2" style="color:#0066CC;"></i>
              <p class="text-sm font-medium">Gérer les services</p>
            </a>
            <a routerLink="/admin/faqs" class="p-4 rounded-xl text-center border border-gray-200 hover:border-green-400 transition-all">
              <i class="fas fa-question-circle text-2xl mb-2 text-green-500"></i>
              <p class="text-sm font-medium">Gérer les FAQs</p>
            </a>
            <a routerLink="/admin/contacts" class="p-4 rounded-xl text-center border border-gray-200 hover:border-purple-400 transition-all">
              <i class="fas fa-envelope text-2xl mb-2 text-purple-500"></i>
              <p class="text-sm font-medium">Messages</p>
            </a>
          </div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4">Informations</h3>
          <div class="space-y-3 text-sm text-gray-600">
            <div class="flex justify-between py-2 border-b"><span>Site</span><span class="font-medium">manawatechs.web.app</span></div>
            <div class="flex justify-between py-2 border-b"><span>Email admin</span><span class="font-medium">{{ adminEmail }}</span></div>
            <div class="flex justify-between py-2 border-b"><span>Dernière connexion</span><span class="font-medium">{{ today }}</span></div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats = { packs: 35, services: 6, faqs: 7, contacts: 0 };
  adminEmail = sessionStorage.getItem('adminEmail') || 'admin@manawatechs.com';
  today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const contacts = this.storage.getAll('contacts');
    this.stats.contacts = contacts.length;
  }
}
