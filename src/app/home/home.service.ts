import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url = "https://jsonplaceholder.typicode.com/users";
  url2 =  "https://jsonplaceholder.typicode.com/todos/1"

  constructor(private http: HttpClient) {}

  // Get all users as an observable
  getUsers(): Observable<any> {
    console.log("Fetching users as observable...");
    return this.http.get<any>(this.url);
  }
  getUsers1(): Observable<any> {
    console.log("Fetching users as observable1...");
    return this.http.get<any>(this.url2);
  }


  // Delete a user by ID as an observable
  deleteUser(userId: number): Observable<any> {
    console.log(`Deleting user with ID ${userId} as observable...`);
    return this.http.delete(`${this.url}/${userId}`);
  }

  // Edit (update) a user by ID as an observable
  editUser(userId: number, updatedData: any): Observable<any> {
    console.log(`Updating user with ID ${userId} as observable...`);
    return this.http.put(`${this.url}/${userId}`, updatedData);
  }
}
