import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-services-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestion des Services</h1>
      <button (click)="showForm = !showForm" class="text-white px-4 py-2 rounded-lg" style="background:#0066CC;">
        <i class="fas fa-plus mr-2"></i> Ajouter
      </button>
    </div>
    @if (showForm) {
      <div class="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div class="grid md:grid-cols-3 gap-4">
          <input [(ngModel)]="form.title" class="px-3 py-2 border rounded-lg" placeholder="Titre">
          <input [(ngModel)]="form.icon" class="px-3 py-2 border rounded-lg" placeholder="fas fa-code">
          <input [(ngModel)]="form.desc" class="px-3 py-2 border rounded-lg" placeholder="Description">
        </div>
        <button (click)="save()" class="mt-3 text-white px-4 py-2 rounded-lg" style="background:#0066CC;">Enregistrer</button>
      </div>
    }
    <div class="grid md:grid-cols-2 gap-4">
      @for (s of services; track s.id) {
        <div class="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
          <div><i [class]="s.icon" style="color:#FF8C1A;"></i> <span class="font-medium">{{ s.title }}</span></div>
          <button (click)="delete(s.id)" class="text-red-500"><i class="fas fa-trash"></i></button>
        </div>
      }
    </div>
  `
})
export class ServicesManageComponent implements OnInit {
  services: any[] = [];
  showForm = false;
  form: any = { title: '', icon: 'fas fa-code', desc: '' };
  constructor(private storage: StorageService) {}
  ngOnInit() { this.load(); }
  load() { this.services = this.storage.getAll('services'); }
  save() { this.storage.add('services', this.form); this.form = { title: '', icon: 'fas fa-code', desc: '' }; this.showForm = false; this.load(); }
  delete(id: string) { this.storage.delete('services', id); this.load(); }
}
