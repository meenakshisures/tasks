import { Component } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements CanComponentDeactivate {
  users: any[] = [];
  formDirty: boolean = true;

  constructor(
    private authService: AuthService,
    private api: HomeService,
    private router: Router
  ) {
    // Fetch users from the API on component load
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers()
      .then(data => {
        console.log('data', data);
        this.users = data.map(m => {
          m["date"] = new Date();
          return m;
        });
        console.log(this.users);
      })
      .catch(err => {
        console.log('Error fetching users:', err);
      });
  }

  // Logout method
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  // Edit a user
  onEdit(user: any) {
    const updatedUserData = { name: 'Updated Name', email: 'updated@example.com' };
    this.api.editUser(user.id, updatedUserData)
      .then(response => {
        console.log('User updated:', response);
        this.getUsers();  // Refresh users list after update
      })
      .catch(err => {
        console.log('Error updating user:', err);
      });
  }

  // Delete a user
  onDelete(user: any) {
    this.api.deleteUser(user.id)
      .then(response => {
        console.log('User deleted:', response);
        this.getUsers();  // Refresh users list after deletion
      })
      .catch(err => {
        console.log('Error deleting user:', err);
      });
  }
}
