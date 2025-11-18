import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';

import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'auth-login-page',
  imports: [CardModule, LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
