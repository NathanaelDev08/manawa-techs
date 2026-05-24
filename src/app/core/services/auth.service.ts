import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  
  user$: Observable<User | null> = user(this.auth);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Vérifier si l'utilisateur est déjà connecté
    this.user$.subscribe(user => {
      this.isAuthenticatedSubject.next(!!user);
    });
  }

  // Connexion
  async login(email: string, password: string): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/admin/login']);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  }

  // Vérifier si l'utilisateur est admin
  async isAdmin(): Promise<boolean> {
    const user = this.auth.currentUser;
    return !!user;
  }

  // Messages d'erreur personnalisés
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Email invalide';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé';
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cet email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/invalid-credential':
        return 'Email ou mot de passe incorrect';
      default:
        return 'Une erreur est survenue lors de la connexion';
    }
  }
}
