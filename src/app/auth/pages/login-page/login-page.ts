import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  imports: [ButtonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService);

  login() {
    this.authService.login('jiji');
  }
}
