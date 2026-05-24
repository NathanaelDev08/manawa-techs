import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-contacts-manage',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Messages reçus ({{ contacts.length }})</h1>
    @if (contacts.length === 0) {
      <div class="bg-white rounded-xl p-12 text-center shadow-sm border text-gray-400">
        <i class="fas fa-inbox text-5xl mb-4"></i>
        <p>Aucun message pour le moment</p>
      </div>
    }
    <div class="space-y-4">
      @for (c of contacts; track c.id) {
        <div class="bg-white p-5 rounded-xl shadow-sm border">
          <div class="flex justify-between mb-2">
            <span class="font-bold">{{ c.name }}</span>
            <span class="text-sm text-gray-400">{{ c.createdAt | date:'short' }}</span>
          </div>
          <p class="text-gray-500 text-sm mb-1">{{ c.email }} @if (c.phone) { • {{ c.phone }} }</p>
          <p class="mt-2">{{ c.message }}</p>
          <button (click)="del(c.id)" class="mt-2 text-red-500 text-sm"><i class="fas fa-trash"></i> Supprimer</button>
        </div>
      }
    </div>
  `
})
export class ContactsManageComponent implements OnInit {
  contacts: any[] = [];
  constructor(private storage: StorageService) {}
  ngOnInit() { this.contacts = this.storage.getAll('contacts'); }
  del(id: string) { if (confirm('Supprimer ?')) { this.storage.delete('contacts', id); this.ngOnInit(); } }
}
