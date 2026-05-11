import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { decodeJwtPayload, jwtPayloadIsStaff } from './jwt.util';

/** Solo usuarios con JWT que incluya is_staff=true (staff Django) acceden a /admin. */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const token = auth.getAccessToken();
  const staff = jwtPayloadIsStaff(token ? decodeJwtPayload(token) : null);
  if (staff) {
    return true;
  }

  auth.logout();
  return router.createUrlTree(['/login']);
};
