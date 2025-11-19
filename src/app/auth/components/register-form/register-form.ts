import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { RecaptchaModule } from 'ng-recaptcha-2';

import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../core/types/response.types';
import { User } from '../../types/auth.types';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'auth-register-form',
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    MessageModule,
    PanelModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RouterLink,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  private formSubmitted = false;
  private captchaToken = '';
  protected siteKey = environment.recaptchaSiteKey;
  public isLoading = signal(false);

  private static strongPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value: string = control.value || '';
    if (!value) return null;

    const hasMinLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const isValid = hasMinLength && hasNumber;

    if (!isValid) {
      return {
        weakPassword: {
          hasMinLength,
          hasNumber,
        },
      };
    }
    return null;
  };

  private static matchPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const formGroup = group as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  protected form = this.fb.group(
    {
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, RegisterForm.strongPasswordValidator],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: RegisterForm.matchPasswords }
  );

  onSubmit() {
    this.formSubmitted = true;
    this.isLoading.set(true);
    if (this.form.valid && this.captchaToken) {
      this.formSubmitted = false;
      const user = {
        name: this.form.value.name!,
        lastName: this.form.value.lastName!,
        username: this.form.value.username!,
        email: this.form.value.email!,
        password: this.form.value.password!,
        recaptchaToken: this.captchaToken,
      };
      this.authService.register(user).subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err),
      });
    } else {
      this.isLoading.set(false);
      if (!this.captchaToken) {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration error',
          detail: 'Please verify that you are not a robot',
          life: 3000,
        });
      }
    }
  }

  handleSuccess(res: ApiResponse<User>) {
    this.form.reset();
    this.router.navigate(['/login']);
    this.messageService.add({
      severity: 'success',
      summary: res.message,
      life: 3000,
    });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading.set(false);
    this.messageService.add({
      severity: 'error',
      summary: 'Registration error',
      detail: error.error.message,
      life: 4000,
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    const controlInvalid =
      control?.invalid && (control.touched || this.formSubmitted);
    if (
      controlName === 'confirmPassword' &&
      (control?.touched || this.formSubmitted)
    ) {
      return controlInvalid || this.form.hasError('passwordMismatch');
    }
    return controlInvalid;
  }

  passwordErrorMessage(): string | null {
    const control = this.form.get('password');
    if (!control) return null;
    if (control.hasError('required')) return 'Password is required.';
    if (control.hasError('weakPassword')) {
      const errors = control.getError('weakPassword');
      const missing: string[] = [];
      if (!errors.hasMinLength) missing.push('at least 8 characters');
      if (!errors.hasNumber) missing.push('at least one number');
      return `Password must include: ${missing.join(', ')}.`;
    }
    return null;
  }

  confirmPasswordErrorMessage(): string | null {
    const confirmControl = this.form.get('confirmPassword');
    if (!confirmControl) return null;
    if (confirmControl.hasError('required'))
      return 'Confirm password is required.';
    if (this.form.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }
    return null;
  }

  resolvedCaptcha(token: string | null) {
    this.captchaToken = token || '';
  }
}
