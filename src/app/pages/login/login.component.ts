import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private userService:UserService){}

  ngOnInit(): void {
   
  }
/*
  login(){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password;
      });
      if(user){
        alert("Login Successful");
        this.loginForm.reset();
        this.router.navigate(['products']);
      }
      else{
        alert("user not found");
      }
    },
    err=>{
      alert("Something went wrong");
    
    })
  }*/
  userlogin(data:any){

    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email===data.email && a.password===data.password;
      });
      if(user){
        alert("Login Successful");
        this.userService.login(user);
        this.router.navigate(['products']);
      }
      else{
        alert("user not found");
      }
    },
    err=>{
      alert("Something went wrong");
    
    })

    
  }


}
