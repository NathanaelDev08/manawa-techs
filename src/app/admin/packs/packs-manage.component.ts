import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-packs-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Packs</h1>
        <button (click)="showForm = !showForm" class="text-white px-4 py-2 rounded-lg font-medium" style="background:#FF8C1A;">
          <i class="fas fa-plus mr-2"></i> Ajouter un pack
        </button>
      </div>

      @if (showForm) {
        <div class="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <h3 class="font-bold mb-4">{{ editingId ? 'Modifier' : 'Ajouter' }} un pack</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm mb-1">Nom du pack</label>
              <input [(ngModel)]="form.name" class="w-full px-3 py-2 border rounded-lg" placeholder="Pack Dépannage Rapid">
            </div>
            <div>
              <label class="block text-sm mb-1">Prix</label>
              <input [(ngModel)]="form.price" class="w-full px-3 py-2 border rounded-lg" placeholder="5 000 CFA">
            </div>
            <div>
              <label class="block text-sm mb-1">Catégorie</label>
              <select [(ngModel)]="form.category" class="w-full px-3 py-2 border rounded-lg">
                <option value="">Choisir...</option>
                <option>Maintenance & Dépannage</option>
                <option>Logiciels & Bureautique</option>
                <option>Étudiants & Particuliers</option>
                <option>TPE & Commerçants</option>
                <option>Odoo & ERP</option>
                <option>Intelligence Artificielle</option>
                <option>Imprimerie Numérique</option>
                <option>Web & Infrastructure</option>
                <option>Formation</option>
              </select>
            </div>
            <div>
              <label class="block text-sm mb-1">Icône (Font Awesome)</label>
              <input [(ngModel)]="form.icon" class="w-full px-3 py-2 border rounded-lg" placeholder="fas fa-tools">
            </div>
          </div>
          <div class="mt-4">
            <label class="block text-sm mb-1">Fonctionnalités (une par ligne)</label>
            <textarea [(ngModel)]="form.featuresText" rows="4" class="w-full px-3 py-2 border rounded-lg" placeholder="Diagnostic à distance&#10;Solution simple&#10;Assistance 30min"></textarea>
          </div>
          <div class="flex gap-3 mt-4">
            <label class="flex items-center gap-2"><input type="checkbox" [(ngModel)]="form.featured"> Pack populaire</label>
            <label class="flex items-center gap-2"><input type="checkbox" [(ngModel)]="form.active"> Actif</label>
          </div>
          <div class="flex gap-3 mt-4">
            <button (click)="savePack()" class="text-white px-6 py-2 rounded-lg" style="background:#0066CC;">
              <i class="fas fa-save mr-2"></i> Enregistrer
            </button>
            <button (click)="resetForm()" class="px-6 py-2 rounded-lg border">Annuler</button>
          </div>
        </div>
      }

      <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left p-3">Pack</th>
                <th class="text-left p-3">Catégorie</th>
                <th class="text-left p-3">Prix</th>
                <th class="text-center p-3">Populaire</th>
                <th class="text-center p-3">Actif</th>
                <th class="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (pack of packs; track pack.id) {
                <tr class="border-t hover:bg-gray-50">
                  <td class="p-3 font-medium">{{ pack.name }}</td>
                  <td class="p-3 text-gray-500">{{ pack.category }}</td>
                  <td class="p-3 font-bold" style="color:#0066CC;">{{ pack.price }}</td>
                  <td class="p-3 text-center">
                    @if (pack.featured) { <span style="color:#FF8C1A;">⭐</span> }
                  </td>
                  <td class="p-3 text-center">
                    <span [class.text-green-600]="pack.active" [class.text-red-500]="!pack.active">
                      {{ pack.active ? '✅' : '❌' }}
                    </span>
                  </td>
                  <td class="p-3 text-right">
                    <button (click)="editPack(pack)" class="text-blue-600 hover:text-blue-800 mr-3"><i class="fas fa-edit"></i></button>
                    <button (click)="deletePack(pack.id)" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PacksManageComponent implements OnInit {
  packs: any[] = [];
  showForm = false;
  editingId: string | null = null;
  
  form: any = {
    name: '', price: '', category: '', icon: 'fas fa-box',
    featuresText: '', featured: false, active: true
  };

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.loadPacks();
  }

  loadPacks() {
    this.packs = this.storage.getAll('packs');
  }

  savePack() {
    const features = this.form.featuresText.split('\n').filter((f: string) => f.trim());
    const data = {
      name: this.form.name,
      price: this.form.price,
      category: this.form.category,
      icon: this.form.icon,
      features: features,
      featured: this.form.featured,
      active: this.form.active
    };

    if (this.editingId) {
      this.storage.update('packs', this.editingId, data);
    } else {
      this.storage.add('packs', data);
    }
    this.resetForm();
    this.loadPacks();
  }

  editPack(pack: any) {
    this.editingId = pack.id;
    this.form = {
      ...pack,
      featuresText: pack.features?.join('\n') || ''
    };
    this.showForm = true;
  }

  deletePack(id: string) {
    if (confirm('Supprimer ce pack ?')) {
      this.storage.delete('packs', id);
      this.loadPacks();
    }
  }

  resetForm() {
    this.showForm = false;
    this.editingId = null;
    this.form = { name: '', price: '', category: '', icon: 'fas fa-box', featuresText: '', featured: false, active: true };
  }
}
