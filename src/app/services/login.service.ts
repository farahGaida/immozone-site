import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly ADMIN_EMAIL = 'admin@immozone.com';
  private readonly ADMIN_PASSWORD = 'admin123';
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    // Check if user is already logged in
    const storedAuth = localStorage.getItem('isLoggedIn');
    if (storedAuth === 'true') {
      this.isAuthenticated.next(true);
    }
  }

  login(email: string, password: string): boolean {
    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      this.isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getAuthStatus() {
    return this.isAuthenticated.asObservable();
  }
} 