import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule] ,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', password: '' };
  message = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        this.message = 'Registration successful! Please login.';
      },
      error => {
        this.message = 'Registration failed!';
      }
    );
  }
}
