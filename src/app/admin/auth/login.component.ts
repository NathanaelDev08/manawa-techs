import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4" style="background: linear-gradient(135deg, #0066CC 0%, #004C99 100%);">
      <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div class="text-center mb-8">
          <div class="text-3xl font-bold mb-2">
            <span style="color:#FF8C1A;">MANAWA</span>
            <span style="color:#0066CC;"> ADMIN</span>
          </div>
          <p class="text-gray-500 text-sm">Panneau d'administration</p>
        </div>

        <form (ngSubmit)="onLogin()" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" [(ngModel)]="email" name="email"
                   class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none"
                   placeholder="admin@manawatechs.com" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" [(ngModel)]="password" name="password"
                   class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none"
                   placeholder="••••••••" required>
          </div>

          @if (error) {
            <div class="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{{ error }}</div>
          }

          <button type="submit" [disabled]="loading"
                  class="w-full text-white py-3 rounded-xl font-medium transition-all duration-300"
                  style="background:#FF8C1A;">
            @if (loading) {
              <i class="fas fa-spinner fa-spin mr-2"></i> Connexion...
            } @else {
              <i class="fas fa-lock mr-2"></i> Se connecter
            }
          </button>
        </form>

        <div class="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
          <p class="font-medium mb-1">Identifiants par défaut :</p>
          <p>📧 admin&#64;manawatechs.com</p>
          <p>🔑 Admin123456</p>
        </div>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authGuard: AuthGuard, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.error = '';
    
    setTimeout(() => {
      if (this.authGuard.login(this.email, this.password)) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.error = 'Email ou mot de passe incorrect';
      }
      this.loading = false;
    }, 800);
  }
}
