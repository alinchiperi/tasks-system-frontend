import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { Observable, map } from 'rxjs';
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
          } else {
            console.log('Problem with login');
          }
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

    // Check if the token is expired or invalid (you may need to use a JWT library for this)
    // You can also handle token expiration on the server-side and return appropriate responses
    // from the API.
    return true;
  }
}
