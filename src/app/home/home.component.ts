import { Component } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { CanComponentDeactivate } from '../can-deactivate.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements CanComponentDeactivate{
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Clear the token using AuthService
    this.router.navigate(['/login']); // Redirect to login
  }
  formDirty: boolean = true; // Example: Assume the form is dirty or unsaved

  canDeactivate(): boolean {
    if (this.formDirty) {
      // Display a confirmation dialog when navigating away
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true; // Allow navigation if there are no unsaved changes
  }

}
