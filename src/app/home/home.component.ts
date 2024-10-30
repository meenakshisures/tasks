import { Component, OnDestroy } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { HomeService } from './home.service';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements CanComponentDeactivate, OnDestroy {
  users: any[] = [];
  formDirty: boolean = true;
  private unsubscribe$ = new Subject<void>(); // For managing subscriptions
  title:string="Hey";
  constructor(
    private authService: AuthService,
    private api: HomeService,
    private router: Router
  ) {
    this.getUsers(); // Call getUsers on component load
    
  }

  // Observable method to get users
  getUsers() {
    console.log('Subscribing to getUsers() observable from HomeService...');
    this.api
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (users) => {
          this.users = users;
          this.callApi();
          console.log('Users in component:', this.users);
        },
        error: (err) => {
          console.error("Error in component's getUsers:", err);
        },
      });
  }
  callApi() {
    this.api.getUsers1().subscribe(
      (data) => {console.log(data),this.title=data.title},
      (err) => {console.log(err)}
    );
  }
  // Logout method
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // CanDeactivate guard implementation
  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  // Observable method to edit a user
  onEdit(user: any) {
    console.log(`Editing user with ID ${user.id}...`);
    // this.abc$.next([1,2])
    const updatedUserData = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    this.api
      .editUser(user.id, updatedUserData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          console.log('User edited successfully.');
          this.getUsers(); // Refresh users list after update
        },
        error: (err) => {
          console.error('Error editing user in component:', err);
        },
      });
  }

  // Observable method to delete a user
  onDelete(user: any) {
    console.log(`Deleting user with ID ${user.id}...`);

    this.api
      .deleteUser(user.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          console.log('User deleted successfully.');
          this.getUsers(); // Refresh users list after deletion
        },
        error: (err) => {
          console.error('Error deleting user in component:', err);
        },
      });
  }

  // Clean up subscriptions on component destroy
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Unsubscribed from all observables in HomeComponent.');
  }
}
