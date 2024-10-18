import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Clear the token using AuthService
    this.router.navigate(['/login']); // Redirect to login
  }
}
