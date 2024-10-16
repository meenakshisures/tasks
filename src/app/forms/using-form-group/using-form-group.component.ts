import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-using-form-group',
  templateUrl: './using-form-group.component.html',
  styleUrls: ['./using-form-group.component.css'],
})
export class UsingFormGroupComponent {
  userForm: FormGroup;

  constructor(private router: Router) {
    this.userForm = new FormGroup({
      username: new FormControl('ss', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]), // Add email validation
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^[a-zA-Z0-9]*$/),
      ]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  onRegister() {
    if (this.userForm.valid) {
      // Store user data in localStorage (temporary storage)
      const registeredUser = this.userForm.value;
      localStorage.setItem('registeredUser', JSON.stringify(registeredUser));

      // Log the form values to the console
      console.log('Registration successful', registeredUser);

      // Redirect to the login page
      alert('Registration successful! Redirecting to login page.');
      this.router.navigate(['/login']); // Navigate to login page
    }
  }

  onCancel() {
    this.userForm.reset();
  }
  onGenderChange(event: any) {
    console.log('Event submitted', event);
    event.target.value;

    if (event.target.value == 'male') {
      this.userForm.controls['age'].disable();
    } else {
      this.userForm.controls['age'].enable();
    }
    console.log(this.userForm.controls['age'].disabled);

  }
}
