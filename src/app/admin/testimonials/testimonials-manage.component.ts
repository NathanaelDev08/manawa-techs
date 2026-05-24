import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-testimonials-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Gestion des Témoignages</h1>
    <div class="bg-white rounded-xl p-6 shadow-sm border mb-6">
      <div class="grid md:grid-cols-3 gap-4">
        <input [(ngModel)]="form.name" class="px-3 py-2 border rounded-lg" placeholder="Nom du client">
        <input [(ngModel)]="form.company" class="px-3 py-2 border rounded-lg" placeholder="Entreprise">
        <input [(ngModel)]="form.rating" type="number" min="1" max="5" class="px-3 py-2 border rounded-lg" placeholder="Note (1-5)">
      </div>
      <textarea [(ngModel)]="form.content" class="w-full mt-3 px-3 py-2 border rounded-lg" placeholder="Témoignage" rows="3"></textarea>
      <button (click)="save()" class="mt-3 text-white px-4 py-2 rounded-lg" style="background:#0066CC;">Ajouter</button>
    </div>
    @for (t of testimonials; track t.id) {
      <div class="bg-white p-4 rounded-xl shadow-sm border flex justify-between mb-3">
        <div>
          <span class="font-bold">{{ t.name }}</span>
          <span class="text-yellow-500 ml-2">{{ '⭐'.repeat(t.rating || 5) }}</span>
          <p class="text-gray-600 text-sm italic mt-1">"{{ t.content }}"</p>
        </div>
        <button (click)="del(t.id)" class="text-red-500"><i class="fas fa-trash"></i></button>
      </div>
    }
  `
})
export class TestimonialsManageComponent implements OnInit {
  testimonials: any[] = [];
  form: any = { name: '', company: '', rating: 5, content: '' };
  constructor(private storage: StorageService) {}
  ngOnInit() { this.load(); }
  load() { this.testimonials = this.storage.getAll('testimonials'); }
  save() { this.storage.add('testimonials', this.form); this.form = { name: '', company: '', rating: 5, content: '' }; this.load(); }
  del(id: string) { this.storage.delete('testimonials', id); this.load(); }
}
