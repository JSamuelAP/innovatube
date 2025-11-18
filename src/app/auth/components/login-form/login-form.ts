import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';

import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../core/types/response.types';
import { User } from '../../types/auth.types';

@Component({
  selector: 'auth-login-form',
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    MessageModule,
    PanelModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  private formSubmitted = false;
  protected isLoading = signal(false);

  private static identifierValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value: string = (control.value || '').trim();
    if (!value) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;

    const isEmail = emailRegex.test(value);
    const isUsername = usernameRegex.test(value);

    return isEmail || isUsername ? null : { invalidIdentifier: true };
  };

  protected form = this.fb.group({
    identifier: ['', [Validators.required, LoginForm.identifierValidator]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.formSubmitted = true;
    this.isLoading.set(true);
    if (this.form.valid) {
      this.formSubmitted = false;

      const credentials = {
        identifier: this.form.value.identifier!,
        password: this.form.value.password!,
      };
      this.authService.login(credentials).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err),
      });
    } else {
      this.isLoading.set(false);
    }
  }

  handleSuccess(res: ApiResponse<User>) {
    this.form.reset();
    this.router.navigate(['/videos']);
    const user = res.data;
    this.messageService.add({
      severity: 'success',
      summary: `Welcome ${user.name} ${user.lastName}!`,
      life: 3000,
    });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading.set(false);
    this.messageService.add({
      severity: 'error',
      summary: 'Access error',
      detail: error.error.message,
      life: 4000,
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  identifierErrorMessage(): string | null {
    const control = this.form.get('identifier');
    if (!control) return null;
    if (control.hasError('required')) return 'Username or email is required.';
    if (control.hasError('invalidIdentifier'))
      return 'Enter a valid username or a valid email.';
    return null;
  }
}
