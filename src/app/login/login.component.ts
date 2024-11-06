// Import necessary modules and dependencies
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login', // Defines the selector for the login component
  templateUrl: './login.component.html', // Points to the HTML template for the login component
  styleUrls: ['./login.component.css'], // Points to the CSS file for styling the component
})
export class LoginComponent {
  // Define the form group for handling login form data
  loginForm: FormGroup;

  // Inject the Router and UserService in the constructor to handle navigation and user data
  constructor(private router: Router, private userservice: UserService) {
    // Fetch and update the user list from the user service on initialization
    this.userservice.getAndUpdateUserList();

    // Initialize the login form with username and password fields and make them required
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // Method to handle login actions when the user submits the form
  onLogin() {
    // Retrieve the list of registered users from the UserService
    const users = this.userservice.users;

    // Check if the users list is empty
    if (!users || users.length === 0) {
      alert('No registered users found.'); // Alert if no users are registered
      return;
    }

    // Check if the login form is valid (both username and password are filled)
    if (this.loginForm.valid) {
      // Extract username and password values from the form
      const { username, password } = this.loginForm.value;

      // Search for the user with a matching username in the users list
      const existingUser = users.find((user) => user.username === username);

      // If a matching user is found
      if (existingUser) {
        // Check if the entered password matches the stored password
        if (existingUser.password === password) {
          // Save the logged-in user to the UserService
          this.userservice.currentUser = existingUser;
          // Store the logged-in user data and an authentication token in localStorage
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
          localStorage.setItem('userToken', 'your-authentication-token');

          alert('Login successful! Redirecting to home page.');
          // Navigate to the home page after successful login
          this.router.navigate(['/home']);
        } else {
          // Alert if the password is incorrect
          alert('Wrong password. Please try again.');
        }
      } else {
        // If username is not found, redirect to the signup page
        alert('User not found. Redirecting to signup page.');
        this.router.navigate(['/signup']);
      }
    } else {
      // Alert if the form is incomplete or invalid
      alert('Form is not valid. Please enter valid credentials.');
    }
  }

  // Method to navigate to the registration (signup) page
  goToRegister() {
    this.router.navigate(['/signup']);
  }
}
