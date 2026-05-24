import { Injectable } from '@angular/core';
import { FirebaseCrudService } from './firebase-crud.service';
import { Observable } from 'rxjs';
import { Pack } from '../models/pack.model';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  private collectionName = 'packs';

  constructor(private firebaseCrud: FirebaseCrudService) {}

  getAll(): Observable<Pack[]> {
    return this.firebaseCrud.getAll(this.collectionName);
  }

  getActive(): Observable<Pack[]> {
    return this.firebaseCrud.getActive(this.collectionName);
  }

  getById(id: string): Observable<Pack> {
    return this.firebaseCrud.getById(this.collectionName, id);
  }

  async create(pack: Partial<Pack>): Promise<string> {
    return this.firebaseCrud.create(this.collectionName, pack);
  }

  async update(id: string, pack: Partial<Pack>): Promise<void> {
    return this.firebaseCrud.update(this.collectionName, id, pack);
  }

  async delete(id: string): Promise<void> {
    return this.firebaseCrud.delete(this.collectionName, id);
  }

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    return this.firebaseCrud.update(this.collectionName, id, { isActive });
  }

  async markPopular(id: string, isPopular: boolean): Promise<void> {
    return this.firebaseCrud.update(this.collectionName, id, { isPopular });
  }
}
