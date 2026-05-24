import { Injectable } from '@angular/core';
import { FirebaseCrudService } from './firebase-crud.service';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private collectionName = 'contacts';

  constructor(private firebaseCrud: FirebaseCrudService) {}

  getAll(): Observable<Contact[]> {
    return this.firebaseCrud.getAll(this.collectionName);
  }

  async create(contact: Partial<Contact>): Promise<string> {
    return this.firebaseCrud.create(this.collectionName, {
      ...contact,
      isRead: false
    });
  }

  async markAsRead(id: string): Promise<void> {
    return this.firebaseCrud.update(this.collectionName, id, { isRead: true });
  }

  async delete(id: string): Promise<void> {
    return this.firebaseCrud.delete(this.collectionName, id);
  }
}
