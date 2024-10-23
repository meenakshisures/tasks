import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  url = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers() {
    return this.http.get<any>(this.url);
  }

  // Delete a user by ID
  deleteUser(userId: number) {
    return this.http.delete(`${this.url}/${userId}`);
  }

  // Edit (update) a user by ID
  editUser(userId: number, updatedData: any) {
    return this.http.put(`${this.url}/${userId}`, updatedData);
  }
}
