import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
 ur="https://jsonplaceholder.typicode.com";//since a part of url is same ,we store this in  a variable
 

  constructor(private http: HttpClient) {}

  // Get all users as an observable
  //https://jsonplaceholder.typicode.com/users
  getUsers(): Observable<any> {
    console.log("Fetching users as observable...");
    return this.http.get<any>(this.ur+"/users");
  }

  //https://jsonplaceholder.typicode.com/todos/1
  getUsers1(): Observable<any> {
    console.log("Fetching users as observable1...");
    return this.http.get<any>(this.ur+"/todos/1");
  }


  // Delete a user by ID as an observable
  deleteUser(userId: number): Observable<any> {
    console.log(`Deleting user with ID ${userId} as observable...`);
    // return this.http.delete(`${this.url}/${userId}`);
    return this.http.delete(this.ur+"/users/"+userId);
  }

  // Edit (update) a user by ID as an observable
  editUser(userId: number, updatedData: any): Observable<any> {
    console.log(`Updating user with ID ${userId} as observable...`);
    return this.http.put(`${this.ur}/users/${userId}`, updatedData);
  
  }
}
