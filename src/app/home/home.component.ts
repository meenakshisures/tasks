// Import essential Angular and RxJS modules needed for this component
import { Component, OnDestroy, OnInit } from '@angular/core';  // Allows us to create components and handle initialization/destruction logic
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';  // Used for handling routes and route data
import { AuthService } from '../auth.service';  // Service for authentication logic
import { CanComponentDeactivate } from '../can-deactivate.guard';  // Guard to check if the component can be left
import { HomeService } from './home.service';  // Service for handling API calls specific to this component
import { forkJoin, Observable, of, Subject } from 'rxjs';  // RxJS utilities for managing data streams
import { takeUntil } from 'rxjs/operators';  // Operator to manage subscriptions

// Define the component, including template, styles, and metadata
@Component({
  selector: 'app-home',  // HTML tag to use this component
  templateUrl: './home.component.html',  // Path to the component's HTML file
  styleUrls: ['./home.component.css'],  // Path to the component's CSS file
})
// Define the HomeComponent class, which implements a guard (CanComponentDeactivate) and lifecycle hooks (OnDestroy, OnInit)
export class HomeComponent implements CanComponentDeactivate, OnDestroy, OnInit {
  users: any[] = [];  // Array to hold user data fetched from an API
  newvariable: any = "<div><p>Heyoo</p></div>";  // Example HTML content to be used within the component
  formDirty: boolean = true;  // Boolean to track if there are unsaved form changes
  private unsubscribe$ = new Subject<void>();  // Subject used to manage and clean up subscriptions
  title: string = 'Hey';  // Title property initialized with a default value

  // Constructor to inject services and router for this component
  constructor(
    private authService: AuthService,  // Injects AuthService to manage authentication tasks
    private api: HomeService,  // Injects HomeService for API calls
    private router: Router,  // Router service to navigate between pages
    private route: ActivatedRoute  // ActivatedRoute to get current route details
  ) {
    console.log('From Constructor');  // Logs when the constructor is called
    this.forkJoinApi();  // Calls the forkJoinApi method to make multiple API calls simultaneously
  }

  // Lifecycle hook method that runs after component initialization
  ngOnInit(): void {
    console.log('From ngOnInit');  // Logs when ngOnInit is called
    console.log('Route', this.router.url);  // Logs the current route URL
    console.log('ActivatedRoute', this.route);  // Logs the ActivatedRoute object

    // Subscribe to route parameter changes
    this.route.params.subscribe(m => console.log("Params", m));  // Logs route parameters
    this.route.queryParams.subscribe(m => console.log("QParams", m));  // Logs query parameters
  }

  // Method to fetch users from the API using an observable
  getUsers() {
    console.log('Subscribing to getUsers() observable from HomeService...');
    this.api.getUsers()  // Calls getUsers from HomeService
      .pipe(takeUntil(this.unsubscribe$))  // Ensures the subscription is unsubscribed when component is destroyed
      .subscribe({
        next: (users) => {  // On successful response, executes this block
          this.users = users;  // Updates users array with fetched data
          this.callApi();  // Calls another API method for additional data
          console.log('Users in component:', this.users);  // Logs users array
        },
        error: (err) => {  // Error handling if API call fails
          console.error("Error in component's getUsers:", err);  // Logs error message
        },
      });
  }

  // Additional API call to fetch more user data
  callApi() {
    this.api.getUsers1().subscribe(
      (data) => {
        console.log(data);
        this.title = data.title;  // Updates title with fetched data
      },
      (err) => {
        console.log(err);  // Logs error if call fails
      }
    );
  }

  // Makes two API calls at once and handles both results together
  forkJoinApi() {
    forkJoin([this.api.getUsers(), this.api.getUsers1()]).subscribe(
      (results) => {
        console.log(results);  // Logs results from both API calls
        this.users = results[0];  // Sets first result as users array
        this.title = results[1].title;  // Sets title based on second result
      },
      (err) => {
        console.log(err);  // Logs error if either API call fails
      }
    );
  }

  // Guard method to confirm if user wants to leave with unsaved changes
  canDeactivate(): boolean {
    if (this.formDirty) {  // Checks if form has unsaved changes
      return confirm('You have unsaved changes. Do you really want to leave?');  // Shows confirmation alert
    }
    return true;  // Allows navigation if no unsaved changes
  }

  // Method to edit a user's data
  onEdit(user: any) {
    console.log(`Editing user with ID ${user.id}...`);  // Logs which user is being edited

    const updatedUserData = {
      name: 'Updated Name',  // New name for the user
      email: 'updated@example.com',  // New email for the user
    };

    this.api.editUser(user.id, updatedUserData)  // Calls API to edit user
      .pipe(takeUntil(this.unsubscribe$))  // Unsubscribes when component is destroyed
      .subscribe({
        next: () => {
          console.log('User edited successfully.');
          this.getUsers();  // Refreshes user list after edit
        },
        error: (err) => {
          console.error('Error editing user in component:', err);  // Logs error if API call fails
        },
      });
  }

  // Method to delete a user from the list
  onDelete(user: any) {
    console.log(`Deleting user with ID ${user.id}...`);  // Logs which user is being deleted

    this.api.deleteUser(user.id)  // Calls API to delete user
      .pipe(takeUntil(this.unsubscribe$))  // Unsubscribes when component is destroyed
      .subscribe({
        next: () => {
          console.log('User deleted successfully.');
          this.getUsers();  // Refreshes user list after deletion
        },
        error: (err) => {
          console.error('Error deleting user in component:', err);  // Logs error if API call fails
        },
      });
  }

  // Lifecycle hook to clean up all subscriptions when component is destroyed
  ngOnDestroy() {
    this.unsubscribe$.next();  // Sends signal to unsubscribe from all observables
    this.unsubscribe$.complete();  // Completes the unsubscribe$ observable
    console.log('Unsubscribed from all observables in HomeComponent.');  // Logs confirmation of cleanup
  }
}
