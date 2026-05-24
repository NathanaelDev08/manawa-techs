import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private adminEmail = 'admin@manawatechs.com';
  private adminPassword = 'Admin123456';

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }

  login(email: string, password: string): boolean {
    if (email === this.adminEmail && password === this.adminPassword) {
      sessionStorage.setItem('adminAuth', 'true');
      sessionStorage.setItem('adminEmail', email);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminEmail');
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('adminAuth') === 'true';
  }
}
