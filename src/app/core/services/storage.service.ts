import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  
  private prefix = 'manawa_';

  getItem(key: string): any {
    const data = localStorage.getItem(this.prefix + key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  getAll(key: string): any[] {
    return this.getItem(key) || [];
  }

  getById(key: string, id: string): any {
    const items = this.getAll(key);
    return items.find((item: any) => item.id === id);
  }

  add(key: string, item: any): any {
    const items = this.getAll(key);
    const newItem = { ...item, id: Date.now().toString(), createdAt: new Date().toISOString() };
    items.push(newItem);
    this.setItem(key, items);
    return newItem;
  }

  update(key: string, id: string, updates: any): any {
    const items = this.getAll(key);
    const index = items.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
      this.setItem(key, items);
      return items[index];
    }
    return null;
  }

  delete(key: string, id: string): void {
    const items = this.getAll(key);
    this.setItem(key, items.filter((item: any) => item.id !== id));
  }
}
