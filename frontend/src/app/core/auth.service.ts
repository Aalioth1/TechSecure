import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface TokenResponse {
  access: string;
  refresh: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  telefono?: string;
  fecha_nacimiento?: string;
}

const ACCESS_KEY = 'techsecure_access';
const REFRESH_KEY = 'techsecure_refresh';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  private readonly accessToken = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem(ACCESS_KEY) : null,
  );

  readonly isAuthenticated = computed(() => !!this.accessToken());

  getAccessToken(): string | null {
    return this.accessToken();
  }

  login(payload: LoginPayload): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.api}/token/`, payload)
      .pipe(tap((res) => this.persistTokens(res)));
  }

  register(payload: RegisterPayload): Observable<unknown> {
    return this.http.post(`${this.api}/usuarios/registro/`, payload);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.accessToken.set(null);
  }

  private persistTokens(tokens: TokenResponse): void {
    localStorage.setItem(ACCESS_KEY, tokens.access);
    localStorage.setItem(REFRESH_KEY, tokens.refresh);
    this.accessToken.set(tokens.access);
  }
}
