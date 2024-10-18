import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); // Returns true if the token exists
  }

  logout() {
    localStorage.removeItem('userToken'); // Clear the token
  }
}
