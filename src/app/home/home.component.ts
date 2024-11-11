import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { HomeService } from './home.service';
import { forkJoin, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements CanComponentDeactivate, OnDestroy, OnInit {
  users: any[] = [];
  editingRowId: number | null = null;
  formDirty: boolean = true;
  private unsubscribe$ = new Subject<void>();
  title: string = 'Hey';
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'actions'];
  userFormsGroup: FormGroup; // Store a FormGroup containing a FormArray for user forms
  // testForm: FormGroup;
  userForms: FormArray = this.fb.array([]); 
  constructor(
    private authService: AuthService,
    private api: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    console.log('From Constructor');
    this.forkJoinApi();

    // Initialize the main FormGroup with a FormArray
    this.userFormsGroup = this.fb.group({
      userForms: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    console.log('From ngOnInit');
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (users) => {
          this.users = users;
          this.initUserForms(); // Initialize form groups for each user
        },
        error: (err) => {
          console.error('Error in component\'s getUsers:', err);
          alert('Failed to fetch users. Please try again later.');
        },
      });
  }

  initUserForms() {
    // Clear existing forms in the Fo
      this.users.forEach(user => {
        this.userForms.push(this.fb.group({
          name: new FormControl(user.name || ''),
          email: new FormControl(user.email),
          addressStreet: new FormControl(user.address?.street || ''),
          addressSuite: new FormControl(user.address?.suite || ''),
          addressCity: new FormControl(user.address?.city || ''),
        }));
      });
  }

  enableEditing(userId: number) {
    this.editingRowId = userId;
  }

  saveEdit(userId: number) {
    const userForm = this.userForms.at(userId);
    if (userForm.valid) {
      const updatedUser = {
        id: userId,
        name: userForm.value.name,
        email: userForm.value.email,
        address: {
          street: userForm.value.addressStreet,
          suite: userForm.value.addressSuite,
          city: userForm.value.addressCity,
        },
      };

      this.api.editUser(userId, updatedUser).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.editingRowId = null;
          this.getUsers();
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    }
  }

  forkJoinApi() {
    forkJoin([this.api.getUsers(), this.api.getUsers1()]).subscribe(
      (results) => {
        console.log(results);
        this.users = results[0];
        this.title = results[1].title;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  cancelEdit() {
    this.editingRowId = null;
    this.getUsers();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Unsubscribed from all observables in HomeComponent.');
  }
}
