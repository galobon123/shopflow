import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403){
          if (!req.url.includes('/api/auth/')) {
            authService.logout();
            router.navigate(['/login'], {queryParams: { expired: 'true' } });
          }
        }
        return throwError(() => err);
      })
    )
  }

  return next(req);
};