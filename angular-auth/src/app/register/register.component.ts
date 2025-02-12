import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(private authService: AuthService, private router: Router) {}

  // register() {
  //   this.authService.register(this.user).subscribe(
  //     response => {
  //       this.message = 'Registration successful! Please login.';

  //       //Redirect to login after 2 seconds
  //       setTimeout(() => {
  //         this.router.navigate(['/login']);
  //       }, 2000);
  //     },
  //     error => {
  //       this.message = 'Registration failed!';
  //     }
  //   );
  // }

  register() {
    if (this.user.username && this.user.password) {
      this.message = 'Registration successful!';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else {
      this.message = 'Please fill all fields!';
    }
  }
}
