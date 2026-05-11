import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/auth.service';
import { BrandingPanelComponent } from '../../shared/branding-panel/branding-panel.component';

@Component({
  selector: 'app-login',
  imports: [
    BrandingPanelComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly hidePassword = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  togglePassword(): void {
    this.hidePassword.update((v) => !v);
  }

  navigateToRegister(): void {
    void this.router.navigateByUrl('/registro');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        if (res.is_staff === true) {
          void this.router.navigate(['/admin']);
        } else {
          this.successMessage.set(
            'Inicio de sesión correcto. Tu cuenta no tiene acceso al panel de administración.',
          );
        }
      },
      error: () => {
        this.errorMessage.set('Credenciales inválidas');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
