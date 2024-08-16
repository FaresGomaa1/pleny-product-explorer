import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isTokenValid().pipe(
      map(response => {
        if (response === 'Token refreshed' || response === 'Token is not expired') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(error => {
        console.error('Error during authentication:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
