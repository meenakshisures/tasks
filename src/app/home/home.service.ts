import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  ur = environment.ur; // Access the API URL based on the environment

  constructor(private http: HttpClient) {}

  // Get all users as an observable
  getUsers(): Observable<any> {
    console.log("Fetching users as observable...");
    return this.http.get<any>(`${this.ur}/users`);
  }

  getUsers1(): Observable<any> {
    console.log("Fetching users1 as observable...");
    return this.http.get<any>(`${this.ur}/todos/1`);
  }

  // Delete a user by ID as an observable
  deleteUser(userId: number): Observable<any> {
    console.log(`Deleting user with ID ${userId} as observable...`);
    return this.http.delete(`${this.ur}/users/${userId}`);
  }

  // Edit (update) a user by ID as an observable
  editUser(userId: number, updatedData: any): Observable<any> {
    console.log(`Updating user with ID ${userId} as observable...`);
    return this.http.put(`${this.ur}/users/${userId}`, updatedData);
  }
}
