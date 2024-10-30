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
    this.getUsers(); // Call getUsers on component load
  }

  // Async method to get users
  async getUsers() {
    console.log("Calling getUsers() from HomeService...");
    try {
      this.users = await this.api.getUsers();
      console.log("Users in component:", this.users);
    } catch (err) {
      console.error("Error in component's getUsers:", err);
    }
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

  // Async method to edit a user
  async onEdit(user: any) {
    console.log(`Editing user with ID ${user.id}...`);
    const updatedUserData = { name: 'Updated Name', email: 'updated@example.com' };
    try {
      await this.api.editUser(user.id, updatedUserData);
      console.log("User edited successfully.");
      await this.getUsers();  // Refresh users list after update
    } catch (err) {
      console.error("Error editing user in component:", err);
    }
  }

  // Async method to delete a user
  async onDelete(user: any) {
    console.log(`Deleting user with ID ${user.id}...`);
    try {
      await this.api.deleteUser(user.id);
      console.log("User deleted successfully.");
      await this.getUsers();  // Refresh users list after deletion
    } catch (err) {
      console.error("Error deleting user in component:", err);
    }
  }
}
