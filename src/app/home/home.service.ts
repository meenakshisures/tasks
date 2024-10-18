import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  getUsers() {
    //   this.http.get("https://jsonplaceholder.typicode.com/users")
    //   .subscribe(data=>{
    //       console.log('data',data)
    //   },err=>{
    //     console.log('err',err)

    //   })
    // }
    return this.http.get<any>("https://jsonplaceholder.typicode.com/users");
  }
  abc = () => {};
}
