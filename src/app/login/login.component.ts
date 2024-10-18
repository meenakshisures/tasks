import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private userservice: UserService) {
    // Get and update the user list from the service
    this.userservice.getAndUpdateUserList();
    // Initialize the login form
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    const users = this.userservice.users; // Get the users list

    if (!users || users.length === 0) {
      alert('No registered users found.');
      return;
    }

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Find the user in the list
      const existingUser = users.find((user) => user.username === username);

      if (existingUser) {
        // Check if the password matches
        if (existingUser.password === password) {
          // Store a token in localStorage to indicate a successful login
          localStorage.setItem('userToken', 'your-authentication-token'); // Example token
          alert('Login successful! Redirecting to home page.');
          this.router.navigate(['/home']);
        } else {
          alert('Wrong password. Please try again.');
        }
      } else {
        alert('User not found. Redirecting to signup page.');
        this.router.navigate(['/signup']);
      }
    } else {
      alert('Form is not valid. Please enter valid credentials.');
    }
  }
}
