import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router){}

  login(data:any){
    //console.log(data);
    this.http.post("http://localhost:5000/token",data).subscribe((result:any)=>{
      //console.log(result);
      localStorage.setItem("token",result.token);
      this.router.navigate(['/products']);
    })
  }
  /*
  profile(){
    debugger;
    let headers= new HttpHeaders().set("Authorization",`bearer ${localStorage.getItem("token")}`)
    this.http.post("http://localhost:5000/profile",{},{headers}).subscribe((result:any)=>{
    
    console.log(result.authData.user);
    })
  }
*/
profile(): Observable<any> {
  let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem("token")}`);
  return this.http.post("http://localhost:5000/profile", {}, { headers }).pipe(
    map((result: any) => result.authData)
  );
}
}
