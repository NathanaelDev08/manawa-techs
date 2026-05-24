import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-faqs-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Gestion des FAQs</h1>
    <div class="bg-white rounded-xl p-6 shadow-sm border mb-6">
      <div class="grid md:grid-cols-2 gap-4">
        <input [(ngModel)]="form.question" class="px-3 py-2 border rounded-lg" placeholder="Question">
        <textarea [(ngModel)]="form.answer" class="px-3 py-2 border rounded-lg" placeholder="Réponse" rows="3"></textarea>
      </div>
      <button (click)="save()" class="mt-3 text-white px-4 py-2 rounded-lg" style="background:#0066CC;">Ajouter FAQ</button>
    </div>
    <div class="space-y-3">
      @for (f of faqs; track f.id) {
        <div class="bg-white p-4 rounded-xl shadow-sm border flex justify-between">
          <div><span class="font-medium">{{ f.question }}</span><p class="text-gray-500 text-sm">{{ f.answer }}</p></div>
          <button (click)="del(f.id)" class="text-red-500"><i class="fas fa-trash"></i></button>
        </div>
      }
    </div>
  `
})
export class FaqsManageComponent implements OnInit {
  faqs: any[] = [];
  form: any = { question: '', answer: '' };
  constructor(private storage: StorageService) {}
  ngOnInit() { this.load(); }
  load() { this.faqs = this.storage.getAll('faqs'); }
  save() { this.storage.add('faqs', this.form); this.form = { question: '', answer: '' }; this.load(); }
  del(id: string) { this.storage.delete('faqs', id); this.load(); }
}
