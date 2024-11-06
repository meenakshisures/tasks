import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   currentUser:any;
  constructor(private auth:AuthService,private router:Router,public userService:UserService) {

   }

  ngOnInit(): void {
   this.currentUser=JSON.parse(localStorage.getItem('currentUser'))//since we have to get the object we use JSON.parse
    // console.log(this.userService.currentUser);
  }
  
 // Logout method
 logout() {
  this.auth.logout();
  
  this.router.navigate(['/login']);
}

}
