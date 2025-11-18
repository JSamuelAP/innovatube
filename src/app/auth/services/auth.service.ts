import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginRequest, SignupRequest, User } from '../types/auth.types';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../core/types/response.types';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/v1/auth';
  private accessToken = 'auth_token';

  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: LoginRequest): Observable<ApiResponse<User>> {
    return this.http
      .post<ApiResponse<User>>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.accessToken, response.data.token);
          localStorage.setItem('current-user', JSON.stringify(response.data));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  register(user: SignupRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.API_URL}/signup`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('current-user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch (e) {
      return null;
    }
  }
}
