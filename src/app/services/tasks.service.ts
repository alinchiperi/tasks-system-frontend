import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/Task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}
  getTasksForUser(): Observable<Task[]> {
    const authToken = this.authService.getAuthToken();
    let email = this.authService.getEmail();

    // console.log(authToken);
    // Create headers with authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiServerUrl}/api/task/all?email=${email}`;
    return this.http.get<Task[]>(url, { headers });
  }
}
