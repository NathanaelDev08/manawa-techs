import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SiteSettings } from '../models/site-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private docId = 'site_settings';

  constructor(private firestore: Firestore) {}

  get(): Observable<SiteSettings> {
    const docRef = doc(this.firestore, `settings/${this.docId}`);
    return docData(docRef, { idField: 'id' }) as Observable<SiteSettings>;
  }

  async update(settings: Partial<SiteSettings>): Promise<void> {
    const docRef = doc(this.firestore, `settings/${this.docId}`);
    await setDoc(docRef, settings, { merge: true });
  }
}
