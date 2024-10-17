import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:any[]=[];
  //it gets invoked initially
  constructor() {
    // this.setUserList(this.users,22)
    // this.setUserList2(this.users)
    // this.setUserList3(this.users)

   }
   //this is a method with two arguments,first one is  a type any,second one is a number both are required
  setUserList(userList:any){
    this.users=userList;
    console.log(this.users)
  }
  //here the default value is assigned for age
  setUserList2(user,age=5){}

  setUserList3(user=5,age){}
}
