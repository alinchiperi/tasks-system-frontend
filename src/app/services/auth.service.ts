import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    return this.http
      .post<any>(`${this.apiServerUrl}/api/auth/login`, body)
      .pipe(
        map((data: any) => {
          if (data) {
            const token = data['token'];
            localStorage.setItem('token', token);
            return data;
          }
        }),
        catchError((error: any) => {
          console.error('Error during login:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }
  logout() {
    localStorage.removeItem('token');
  }
  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserRole(): string | null {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }

    // Decode the token to get the user's role information
    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    return decodedToken.roles || null;
  }
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  getEmail(): string {
    const token = this.getAuthToken();
    let email: string = '';
    if (token) {
      const decoded: any = jwtDecode(token);

      email = JSON.stringify(decoded['sub']).replaceAll('"', '');
    }
    return email;
  }
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }
    return true;
  }

  getUserId(): string | null {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.user_id;
  }
  registerUser(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };
    const url = `${this.apiServerUrl}/api/auth/register`;
    return this.http.post(url, body);
  }

  buyPremium(): Observable<any> {
    const authToken = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const email = this.getEmail();
    const url = `${this.apiServerUrl}/api/user/${email}/premium`;

    return this.http.post(url, null, { headers });
  }
}
