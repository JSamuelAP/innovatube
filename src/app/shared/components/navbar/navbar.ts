import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

import { AuthService } from '../../../auth/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Search',
        icon: 'pi pi-youtube',
        command: () => {
          this.router.navigate(['/videos']);
        },
      },
      {
        label: 'Favorites',
        icon: 'pi pi-star',

        command: () => {
          this.router.navigate(['/favorites']);
        },
      },
    ];
  }

  logout() {
    this.authService.logout();
  }

  getUserFullName(): string {
    const user = this.authService.getCurrentUser();
    return `${user?.name} ${user?.lastName}`;
  }
}
