import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { HomeService } from './home.service';
import { forkJoin, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements CanComponentDeactivate, OnDestroy, OnInit {
  users: any[] = [];
  originalUsers: any[] = []; // To store users in their original ID order
  editingRowId: number | null = null;
  formDirty: boolean = true;
  private unsubscribe$ = new Subject<void>();
  title: string = 'Hey';
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'actions'];
  userFormsGroup: FormGroup;
  userForms: FormArray = this.fb.array([]);

  constructor(
    private authService: AuthService,
    private api: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.forkJoinApi();
    this.userFormsGroup = this.fb.group({
      userForms: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (users) => {
          this.originalUsers = users.map((m) => ({ ...m }));  // Preserve original order
          this.sortUsers();  // Sort users by name while preserving ID order
          this.initUserForms();
        },
        error: (err) => {
          console.error('Error in component\'s getUsers:', err);
          alert('Failed to fetch users. Please try again later.');
        },
      });
  }

  sortUsers() {
    // Sort users by name while keeping IDs in the original order
    this.users = [...this.originalUsers]
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  initUserForms() {
    this.userForms.clear();
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
    const index = this.users.findIndex((user) => user.id === this.editingRowId);
    const userForm = this.userForms.at(index);

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

      if (index > -1) {
        // Update user in originalUsers to maintain order
        const originalIndex = this.originalUsers.findIndex(user => user.id === userId);
        this.originalUsers[originalIndex] = updatedUser;
        this.editingRowId = null;
        this.sortUsers();  // Sort users again after edit
        this.initUserForms();
      }
    }
  }

  forkJoinApi() {
    forkJoin([this.api.getUsers(), this.api.getUsers1()]).subscribe(
      (results) => {
        this.originalUsers = results[0];
        this.title = results[1].title;
        this.sortUsers();  // Sort after fetching data from multiple APIs
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
  }
onDelete(userId){
 const deleteItem=this.users.filter((user)=>user.id!=userId)
 this.users=deleteItem;
}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Unsubscribed from all observables in HomeComponent.');
  }
}
