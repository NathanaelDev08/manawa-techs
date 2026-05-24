import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 flex-shrink-0 text-white hidden lg:flex flex-col" style="background:#0f172a;">
        <div class="p-5 border-b border-gray-800">
          <span style="color:#FF8C1A; font-weight:800; font-size:1.2rem;">MANAWA</span>
          <span style="color:white; font-weight:600;"> ADMIN</span>
        </div>
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-th-large w-5"></i> Dashboard
          </a>
          <a routerLink="/admin/packs" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-box w-5"></i> Packs ({{packCount}})
          </a>
          <a routerLink="/admin/services" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-cogs w-5"></i> Services
          </a>
          <a routerLink="/admin/faqs" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-question-circle w-5"></i> FAQs
          </a>
          <a routerLink="/admin/testimonials" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-star w-5"></i> Témoignages
          </a>
          <a routerLink="/admin/contacts" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-envelope w-5"></i> Messages
          </a>
          <a routerLink="/admin/settings" routerLinkActive="bg-orange-500 text-white"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
            <i class="fas fa-cog w-5"></i> Paramètres
          </a>
          <hr class="border-gray-700 my-3">
          <a routerLink="/" target="_blank"
             class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 hover:bg-gray-800 transition-all">
            <i class="fas fa-external-link-alt w-5"></i> Voir le site
          </a>
          <button (click)="logout()"
                  class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-900/30 transition-all">
            <i class="fas fa-sign-out-alt w-5"></i> Déconnexion
          </button>
        </nav>
      </aside>

      <!-- Mobile sidebar toggle -->
      <div class="lg:hidden fixed top-4 left-4 z-50">
        <button (click)="mobileOpen = !mobileOpen" class="text-white p-2 rounded-lg" style="background:#0f172a;">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
      @if (mobileOpen) {
        <div class="lg:hidden fixed inset-0 z-40 flex">
          <div class="w-64 text-white flex-shrink-0" style="background:#0f172a;">
            <div class="p-5 border-b border-gray-800 flex justify-between">
              <span style="color:#FF8C1A;">MANAWA ADMIN</span>
              <button (click)="mobileOpen = false" class="text-white"><i class="fas fa-times"></i></button>
            </div>
            <nav class="p-4 space-y-1">
              <a routerLink="/admin/dashboard" (click)="mobileOpen = false" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800">Dashboard</a>
              <a routerLink="/admin/packs" (click)="mobileOpen = false" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800">Packs</a>
              <a routerLink="/admin/services" (click)="mobileOpen = false" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800">Services</a>
              <a routerLink="/admin/faqs" (click)="mobileOpen = false" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800">FAQs</a>
              <a routerLink="/admin/contacts" (click)="mobileOpen = false" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800">Messages</a>
              <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400">Déconnexion</button>
            </nav>
          </div>
          <div class="flex-1 bg-black/50" (click)="mobileOpen = false"></div>
        </div>
      }

      <!-- Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="bg-white shadow-sm h-16 flex items-center px-6">
          <h1 class="text-lg font-semibold text-gray-800">Panneau d'administration</h1>
          <span class="ml-auto text-sm text-gray-500">👋 {{ adminName }}</span>
        </header>
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class AdminLayoutComponent {
  mobileOpen = false;
  packCount = 35;
  adminName = sessionStorage.getItem('adminEmail') || 'Admin';

  constructor(private authGuard: AuthGuard) {}

  logout() {
    this.authGuard.logout();
  }
}
