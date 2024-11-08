// Import necessary modules from Angular
import { Component } from '@angular/core'; // Import Component to define an Angular component
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import FormControl, FormGroup, and Validators for form handling and validation
import { Router } from '@angular/router'; // Import Router to enable navigation to different pages
import { UserService } from 'src/app/user.service'; // Import UserService to interact with user data

@Component({
  selector: 'app-using-form-group', // Define the selector for the component, which will be used in the HTML
  templateUrl: './using-form-group.component.html', // Link the HTML template for the component
  styleUrls: ['./using-form-group.component.css'], // Link the CSS styles for the component
})
export class UsingFormGroupComponent {
  // Declare a FormGroup to manage the form's controls and validation
  userForm: FormGroup;

  constructor(private router: Router, private userService: UserService) {
    // Initialize the form group with form controls and validation
    this.userForm = new FormGroup({
      // Define a FormControl for 'username', with a required validator
      username: new FormControl('ss', [Validators.required]),

      // Define a FormControl for 'email', with required and email format validators
      email: new FormControl('', [Validators.required, Validators.email]), 

      // Define a FormControl for 'password' with multiple validations
      password: new FormControl('', [
        Validators.required, // Password is required
        Validators.minLength(8), // Password should be at least 8 characters long
        Validators.maxLength(8), // Password should be at most 8 characters long
        Validators.pattern(/^[a-zA-Z0-9]*$/), // Password should only contain alphanumeric characters
      ]),

      // Define a FormControl for 'age', with a required validator
      age: new FormControl('', [Validators.required]),

      // Define a FormControl for 'gender', with a required validator
      gender: new FormControl('', [Validators.required]),
    });
  }
  

  // Method that is called when the form is submitted
  onRegister() {
    if (this.userForm.valid) {
      // If the form is valid, we proceed with registration
      const registeredUser = this.userForm.value; // Get form data as an object

      // Get the current user list from localStorage (if it exists)
      let user = JSON.parse(localStorage.getItem('userList'));

      // If there are existing users in localStorage, add the new user to the list
      if (user?.length > 0) {
        user.push(registeredUser);
        localStorage.setItem('userList', JSON.stringify(user)); // Save the updated list back to localStorage
      } else {
        // If no users exist in localStorage, create a new list with the current user
        user = [registeredUser];
        localStorage.setItem('userList', JSON.stringify(user)); // Save the new list to localStorage
      }

      // Optional: Log the form values to the console for debugging
      // console.log('Registration successful', registeredUser);

      // Show a success alert to the user
      alert('Registration successful! Redirecting to login page.');

      // Update the user list in the UserService for sharing data between components
      this.userService.setUserList(user);

      // Navigate to the login page after successful registration
      this.router.navigate(['/login']); 
    }
  }

  // Method to reset the form if the user clicks on the cancel button
  onCancel() {
    this.userForm.reset(); // Reset all form controls to their initial values
  }

  // Method to handle changes in the gender selection
  onGenderChange(event: any) {
    console.log('Event submitted', event); // Log the event for debugging

    // Check the selected gender value
    if (event.target.value == 'male') {
      // If the selected gender is 'male', disable the 'age' field
      this.userForm.controls['age'].disable();
    } else {
      // If the selected gender is not 'male', enable the 'age' field
      this.userForm.controls['age'].enable();
    }

    // Log the status of the 'age' control (disabled or enabled) for debugging
    console.log(this.userForm.controls['age'].disabled);
  }
}
