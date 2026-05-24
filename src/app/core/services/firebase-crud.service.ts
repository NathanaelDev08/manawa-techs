import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {

  constructor(private firestore: Firestore) {}

  // Récupérer tous les documents d'une collection
  getAll(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' });
  }

  // Récupérer un document par son ID
  getById(collectionName: string, id: string): Observable<any> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(docRef, { idField: 'id' });
  }

  // Créer un nouveau document
  async create(collectionName: string, data: any): Promise<string> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  }

  // Mettre à jour un document
  async update(collectionName: string, id: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  }

  // Supprimer un document
  async delete(collectionName: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    await deleteDoc(docRef);
  }

  // Récupérer les documents actifs
  getActive(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const q = query(collectionRef, where('isActive', '==', true), orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' });
  }
}
