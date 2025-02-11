import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink ],
})
export class NavbarComponent {
  constructor(private router: Router){}

  logout(){
    // Clear user authentication data (if using local storage or session storage)
    localStorage.removeItem('userToken'); // Example
    sessionStorage.clear();

       // Navigate to the login page
       this.router.navigate(['/login']);
  }
}
