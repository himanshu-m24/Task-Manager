import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/auth/tasks'; // Backend API ka URL

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete task
  // deleteTask(taskId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  // }

  deleteTask(taskId: number) {
    return this.http.delete(`http://localhost:8080/api/auth/tasks/${taskId}`);
  }
  

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, task);
  }

  
}
