import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/auth/tasks';

  constructor(private http: HttpClient) {}


  // ✅ Add Authorization Header
   
   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token); // Debugging

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  //  Get all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

    // ✅ Fetch a Task by ID with token
    getTaskById(taskId: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() });
    }
  

  //  Update an existing task
  updateTask(task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${task.id}`, task);
  }

  //  Delete a task
  deleteTask(taskId: number) {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }

  //  Add a new task
  addTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, task);
  }
}
