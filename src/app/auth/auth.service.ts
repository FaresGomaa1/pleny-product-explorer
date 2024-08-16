import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserCredentials, IUser } from '../shared/Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string, expiresInMins: number = 30): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: IUserCredentials = {
      username: username,
      password: password,
      expiresInMins: expiresInMins
    };

    return this.http.post<IUser>(this.apiUrl, body, { headers: headers })
      .pipe(
        map(response => {
          this.storeResponse(response);
          return response;
        })
      );
  }

  private storeResponse(response: IUser): void {
    localStorage.setItem('user', JSON.stringify(response));
  }
}
