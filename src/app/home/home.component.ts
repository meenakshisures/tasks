import { Component, OnDestroy, OnInit } from '@angular/core';  // Importing Angular core functionality to create components and handle lifecycle events
import { ActivatedRoute, Router } from '@angular/router';  // Importing Angular's routing tools for navigation
import { AuthService } from '../auth.service';  // Importing authentication service (for login/logout)
import { CanComponentDeactivate } from '../can-deactivate.guard';  // Importing a guard to handle navigation (like checking unsaved changes)
import { HomeService } from './home.service';  // Importing a service that handles fetching data from the server (like user data)
import { forkJoin, Subject, of } from 'rxjs';  // Importing operators and utilities for handling multiple observables
import { catchError, takeUntil } from 'rxjs/operators';  // Importing operators for error handling and cleanup
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';  // Importing tools for building reactive forms

@Component({
  selector: 'app-home',  // The component's selector that will be used in HTML
  templateUrl: './home.component.html',  // Path to the component's HTML template
  styleUrls: ['./home.component.css'],  // Path to the component's CSS for styling
})
export class HomeComponent implements CanComponentDeactivate, OnDestroy, OnInit {  // Main class for the component, implementing lifecycle hooks
  users: any[] = [];  // Array to store user data
  editingRowId: number | null = null;  // Variable to keep track of which row is being edited
  formDirty: boolean = true;  // Flag to check if the form has unsaved changes
  private unsubscribe$ = new Subject<void>();  // Subject for unsubscribing from observables when component is destroyed
  title: string = 'Hey';  // Default title text
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'actions'];  // Column names for the user table
  userFormsGroup: FormGroup;  // FormGroup to hold a group of user forms
  userForms: FormArray = this.fb.array([]);  // FormArray to hold multiple FormControls for each user

  constructor(
    private authService: AuthService,  // Injecting AuthService
    private api: HomeService,  // Injecting HomeService to fetch user data
    private router: Router,  // Injecting Router to handle navigation
    private route: ActivatedRoute,  // Injecting ActivatedRoute to get route-related info
    private fb: FormBuilder  // Injecting FormBuilder to easily create forms
  ) {
    console.log('From Constructor');  // Logs when the constructor is called
    this.forkJoinApi();  // Calls a function to fetch data using forkJoin

    // Initializing the user forms group with a FormArray
    this.userFormsGroup = this.fb.group({
      userForms: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    console.log('From ngOnInit');  // Logs when the component's OnInit lifecycle method runs
    this.getUsers();  // Fetch users when component is initialized
  }

  getUsers() {
    // Calling the service to get the user data from the API
    this.api.getUsers()
      .pipe(takeUntil(this.unsubscribe$))  // Automatically unsubscribe when the component is destroyed
      .subscribe({
        next: (users) => {  // If the request is successful, this code runs
          this.users = users;  // Storing the fetched users in the users array
          this.initUserForms();  // Initializes the forms for each user
        },
        error: (err) => {  // If there's an error, this code runs
          console.error('Error in component\'s getUsers:', err);  // Log the error
          alert('Failed to fetch users. Please try again later.');  // Show a user-friendly error message
        },
      });
  }

  initUserForms() {
    // Initializes forms for each user
    this.users.forEach(user => {
      this.userForms.push(this.fb.group({
        name: new FormControl(user.name || ''),  // Create a form control for user's name
        email: new FormControl(user.email),  // Create a form control for user's email
        addressStreet: new FormControl(user.address?.street || ''),  // Create a form control for address street
        addressSuite: new FormControl(user.address?.suite || ''),  // Create a form control for address suite
        addressCity: new FormControl(user.address?.city || ''),  // Create a form control for address city
      }));
    });
  }

  enableEditing(userId: number) {
    // Sets the ID of the row currently being edited
    this.editingRowId = userId;
  }

  saveEdit(userId: number) {
    // When saving the edit, this function gets triggered
    const userForm = this.userForms.at(userId);  // Get the form for the specific user
    if (userForm.valid) {  // Check if the form is valid (i.e., all fields are filled correctly)
      const updatedUser = {
        id: userId,
        name: userForm.value.name,  // Get the name from the form
        email: userForm.value.email,  // Get the email from the form
        address: {
          street: userForm.value.addressStreet,  // Get the address street from the form
          suite: userForm.value.addressSuite,  // Get the address suite from the form
          city: userForm.value.addressCity,  // Get the address city from the form
        },
      };

      // Send the updated user data to the server to save it
      this.api.editUser(userId, updatedUser).subscribe({
        next: () => {  // If the update is successful
          console.log('User updated successfully');  // Log success
          this.editingRowId = null;  // Stop editing mode
          this.getUsers();  // Fetch the updated list of users
        },
        error: (err) => {  // If there's an error during the update
          console.error('Error updating user:', err);  // Log the error
        },
      });
    }
  }

  forkJoinApi() {
    // Fetch data from multiple APIs using forkJoin (this makes multiple HTTP requests in parallel)
    forkJoin([this.api.getUsers(), this.api.getUsers1()]).subscribe(
      (results) => {
        console.log(results);  // Log the results of both API calls
        this.users = results[0];  // Set the first API's result (users data)
        this.title = results[1].title;  // Set the title from the second API's result
      },
      (err) => {  // If there's an error
        console.log(err);  // Log the error
      }
    );
  }

  canDeactivate(): boolean {
    // This function checks if there are unsaved changes when navigating away from the page
    if (this.formDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');  // Show a confirmation dialog
    }
    return true;  // If there are no unsaved changes, allow navigation
  }

  cancelEdit() {
    // Cancel the edit and reset the form to its original state
    this.editingRowId = null;  // Stop editing mode
    this.getUsers();  // Fetch the list of users again to reset any changes
  }

  ngOnDestroy() {
    // Cleanup before the component is destroyed (e.g., unsubscribing from observables to avoid memory leaks)
    this.unsubscribe$.next();  // Trigger the unsubscription
    this.unsubscribe$.complete();  // Complete the unsubscribe process
    console.log('Unsubscribed from all observables in HomeComponent.');  // Log the unsubscription
  }
}
