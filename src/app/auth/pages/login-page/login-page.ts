import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { LoginForm } from '../../components/login-form/login-form';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'auth-login-page',
  imports: [ButtonModule, CardModule, LoginForm, PanelModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
