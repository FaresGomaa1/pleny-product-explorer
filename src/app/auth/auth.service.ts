import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUserCredentials, IUser, ITokens } from '../shared/Interfaces/iuser';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  // Method to check if the token is valid
  isTokenValid(): Observable<string> {
    const tokenString = localStorage.getItem('user');
    if (!tokenString) {
      return of('Token not found');
    }

    try {
      const token: ITokens = JSON.parse(tokenString);

      if (this.jwtHelper.isTokenExpired(token.token)) {
        return this.refreshToken(token.refreshToken).pipe(
          switchMap((newTokens: ITokens) => {
            localStorage.setItem('user', JSON.stringify(newTokens));
            return of('Token refreshed');
          }),
          catchError(error => {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('user'); // Clear token on error
            return of('Error refreshing token');
          })
        );
      }

      return of('Token is not expired');
    } catch (error) {
      console.error('Error parsing token:', error);
      localStorage.removeItem('user'); // Clear token on error
      return of('Invalid token format');
    }
  }

  // Method to refresh the token
  refreshToken(refreshToken: string, expiresInMins: number = 30): Observable<ITokens> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ITokens>(`${this.apiUrl}/refresh`, { refreshToken, expiresInMins }, { headers })
      .pipe(
        catchError(error => {
          console.error('Error refreshing token:', error);
          return throwError(() => new Error('Error refreshing token'));
        })
      );
  }

  // Method to login
  login(username: string, password: string, expiresInMins: number = 30): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: IUserCredentials = { username, password, expiresInMins };

    return this.http.post<IUser>(`${this.apiUrl}/login`, body, { headers })
      .pipe(
        map(response => {
          this.storeResponse(response);
          return response;
        }),
        catchError(error => {
          console.error('Error logging in:', error);
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  // Method to store response
  private storeResponse(response: IUser): void {
    try {
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }
}
