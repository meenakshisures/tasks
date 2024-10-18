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
  users: any[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      address: {
        street: 'Douglas Extension',
        suite: 'Suite 847',
        city: 'McKenziehaven',
        zipcode: '59590-4157',
        geo: {
          lat: '-68.6102',
          lng: '-47.0653',
        },
      },
      phone: '1-463-123-4447',
      website: 'ramiro.info',
      company: {
        name: 'Romaguera-Jacobson',
        catchPhrase: 'Face to face bifurcated interface',
        bs: 'e-enable strategic applications',
      },
    },
  ];
  constructor(
    private authService: AuthService,
    private api: HomeService,
    private router: Router
  ) {
    this.api.getUsers().subscribe(
      (data) => {
        console.log('data', data);
        this.users=data;
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  logout() {
    this.authService.logout(); // Clear the token using AuthService
    this.router.navigate(['/login']); // Redirect to login
  }
  formDirty: boolean = true; // Example: Assume the form is dirty or unsaved

  canDeactivate(): boolean {
    if (this.formDirty) {
      // Display a confirmation dialog when navigating away
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true; // Allow navigation if there are no unsaved changes
  }
}
