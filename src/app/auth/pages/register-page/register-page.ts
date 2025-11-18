import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';

import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  selector: 'auth-register-page',
  imports: [CardModule, RegisterForm],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {}
