export interface Admin {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'superadmin' | 'admin' | 'editor';
  lastLogin: Date;
  createdAt: Date;
}
