import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken = 'auth_token';

  constructor(private router: Router) {}

  login(token: string): void {
    localStorage.setItem(this.accessToken, token);
    this.router.navigate(['/videos']);
  }

  logout(): void {
    localStorage.removeItem(this.accessToken);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessToken);
  }
}
