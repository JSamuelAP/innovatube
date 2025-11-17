import { Routes } from '@angular/router';

import { AuthLayout } from './auth/layouts/auth-layout/auth-layout';
import { LoginPage } from './auth/pages/login-page/login-page';
import { RegisterPage } from './auth/pages/register-page/register-page';
import { MainLayout } from './videos/layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { HomePage } from './videos/pages/home-page/home-page';
import { FavoritesPage } from './videos/pages/favorites-page/favorites-page';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'videos', component: HomePage },
      { path: 'favorites', component: FavoritesPage },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
