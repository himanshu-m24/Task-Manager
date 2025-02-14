import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  message = '';

  constructor(private router: Router, private http: HttpClient) {} 

  login() {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.credentials)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token); // Store token
          console.log(localStorage.getItem('token'));

          this.message = response.message;
          this.router.navigate(['/home']); // Redirect to home page
        },
        error => {
          this.message = 'Invalid username or password!';
        }
      );
  }
}
