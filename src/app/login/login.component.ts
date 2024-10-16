import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router) {
   
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
   
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');

    
    if (registeredUser && this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

    
      if (registeredUser.username === username && registeredUser.password === password) {
        alert('Login successful! Redirecting to home page.');
        this.router.navigate(['/home']); 
      } else {
        alert('Invalid username or password.');
      }
    }
  }
}
