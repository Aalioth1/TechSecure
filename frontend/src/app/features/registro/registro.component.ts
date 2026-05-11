import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../core/auth.service';
import { BrandingPanelComponent } from '../../shared/branding-panel/branding-panel.component';

@Component({
  selector: 'app-registro',
  imports: [
    BrandingPanelComponent,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly hidePassword = signal(true);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.pattern(/^\S+$/)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    telefono: [''],
    fecha_nacimiento: [null as Date | null],
  });

  togglePassword(): void {
    this.hidePassword.update((v) => !v);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    const payload = {
      username: raw.username,
      password: raw.password,
      email: raw.email.trim().toLowerCase(),
      first_name: raw.first_name,
      last_name: raw.last_name,
      telefono: raw.telefono,
      fecha_nacimiento: raw.fecha_nacimiento
        ? raw.fecha_nacimiento.toISOString().slice(0, 10)
        : undefined,
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.snackBar.open(
          'Tu cuenta se creó correctamente. Ya puedes iniciar sesión.',
          'Entendido',
          {
            duration: 6000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          },
        );
        void this.router.navigate(['/login']);
      },
      error: (err: unknown) => {
        const msg = this.formatRegisterError(err);
        console.error('[Registro] fallo', err);
        this.errorMessage.set(msg);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  /** Convierte respuestas 400 de Django/DRF en texto legible para el usuario. */
  private formatRegisterError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error;
      if (body && typeof body === 'object' && !Array.isArray(body)) {
        const parts: string[] = [];
        for (const [key, val] of Object.entries(body as Record<string, unknown>)) {
          if (Array.isArray(val)) {
            parts.push(`${key}: ${val.join(' ')}`);
          } else if (typeof val === 'string') {
            parts.push(`${key}: ${val}`);
          }
        }
        if (parts.length) {
          return parts.join(' · ');
        }
      }
      if (err.status === 0) {
        return 'No hay conexión con el servidor. ¿Está corriendo Django en :8000?';
      }
      if (err.status === 404) {
        return 'El endpoint de registro no existe en el servidor (404).';
      }
    }
    return 'No se pudo registrar el usuario';
  }
}
