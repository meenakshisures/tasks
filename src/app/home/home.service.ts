import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) {}

  // Get all users
  async getUsers(): Promise<any> {
    console.log("Fetching users...");  // Log before calling await
    try {
      const response = await this.http.get<any>(this.url).toPromise();
      console.log("Users fetched successfully:", response); // Log after await
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Delete a user by ID
  async deleteUser(userId: number): Promise<any> {
    console.log(`Deleting user with ID ${userId}...`);
    try {
      const response = await this.http.delete(`${this.url}/${userId}`).toPromise();
      console.log("User deleted:", response);
      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Edit (update) a user by ID
  async editUser(userId: number, updatedData: any): Promise<any> {
    console.log(`Updating user with ID ${userId}...`);
    try {
      const response = await this.http.put(`${this.url}/${userId}`, updatedData).toPromise();
      console.log("User updated:", response);
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}
