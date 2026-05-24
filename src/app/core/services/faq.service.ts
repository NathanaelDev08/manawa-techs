import { Injectable } from '@angular/core';
import { FirebaseCrudService } from './firebase-crud.service';
import { Observable } from 'rxjs';
import { FAQ } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private collectionName = 'faqs';

  constructor(private firebaseCrud: FirebaseCrudService) {}

  getAll(): Observable<FAQ[]> {
    return this.firebaseCrud.getAll(this.collectionName);
  }

  getActive(): Observable<FAQ[]> {
    return this.firebaseCrud.getActive(this.collectionName);
  }

  async create(faq: Partial<FAQ>): Promise<string> {
    return this.firebaseCrud.create(this.collectionName, faq);
  }

  async update(id: string, faq: Partial<FAQ>): Promise<void> {
    return this.firebaseCrud.update(this.collectionName, id, faq);
  }

  async delete(id: string): Promise<void> {
    return this.firebaseCrud.delete(this.collectionName, id);
  }
}
