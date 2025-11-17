import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'home-page',
  imports: [ButtonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private authService = inject(AuthService);
  protected id = this.authService.getCurrentUser()?.id;

  logout() {
    this.authService.logout();
  }
}
