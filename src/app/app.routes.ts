import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: 'admin/login', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: 'admin/packs', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: '**', redirectTo: '' }
];
