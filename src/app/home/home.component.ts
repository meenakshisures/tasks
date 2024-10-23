import { Component } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements CanComponentDeactivate {
  users: any[] = [];
  formDirty: boolean = true; // Example: Assume the form is dirty or unsaved

  constructor(
    private authService: AuthService,
    private api: HomeService,
    private router: Router
  ) {this.getUsers();
    // Fetch users from the API on component load
    
  }
  getUsers(){
    this.api.getUsers().subscribe(
      (data) => {
        console.log('data', data);
        this.users = data.map(m=>{
          console.log(m);
          m["date"]=new Date();
          console.log(m.date)
          return m;
          
        });
        console.log(this.users)
      },

      (err) => {
        console.log('err', err);
      }
    );
  }

  // Logout method
  logout() {
    this.authService.logout(); // Clear the token using AuthService
    this.router.navigate(['/login']); // Redirect to login
  }


  canDeactivate(): boolean {
    if (this.formDirty) {
      // Display a confirmation dialog when navigating away
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true; // Allow navigation if there are no unsaved changes
  }

  // Edit a user
  onEdit(user: any) {
    const updatedUserData = { name: 'Updated Name', email: 'updated@example.com' };
    this.api.editUser(user.id, updatedUserData).subscribe(
      (response) => {
        console.log('User updated:', response);
        // Update the local users array with the new data
       this.getUsers();
      },
      
      (err) => {
        console.log('Error updating user:', err);
      }
    );
  }

  // Delete a user
  onDelete(user: any) {
    this.api.deleteUser(user.id).subscribe(
      (response) => {
        console.log('User deleted:', response);
        // Remove the user from the local users array
        // this.users = this.users.filter(u => u.id !== user.id);
      this.getUsers();
      },
      (err) => {
        console.log('Error deleting user:', err);
      }
    );
  }
}
