import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/Task';
import { AuthService } from './auth.service';
import { Reminder } from '../model/Reminder';

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

  addTask(task): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/task/add`;
    return this.http.post(url, task, { headers });
  }
  deleteTask(taskId: number): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/task/${taskId}/delete`;
    return this.http.delete(url, { headers });
  }
  completeTask(taskId: number): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/task/${taskId}/complete`;

    console.log(this.http.patch(url, { headers }));

    return this.http.patch(url, null, { headers });
  }
  editTask(id, task): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/task/${id}/update`;
    return this.http.patch(url, task, { headers });
  }
  addReminder(reminder): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/reminders/add`;
    return this.http.post(url, reminder, { headers });
  }
  getReminders(): Observable<Reminder[]> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/reminders/all`;
    return this.http.get<Reminder[]>(url, { headers });
  }
  deleteReminders(id): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/reminders/${id}/delete`;
    return this.http.delete(url, { headers });
  }
  editReminder(reminder): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const url = `${this.apiServerUrl}/api/reminders/update`;
    return this.http.patch(url, reminder, { headers });
  }
}
