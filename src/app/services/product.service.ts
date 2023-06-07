import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{
  
  public cartAddedSubject =new Subject<boolean>;
  user1 :any;
  constructor(private http:HttpClient,private user:UserService) { 
/*
    setTimeout(()=>{
    this.user.profile().subscribe((user: any) => {
      this.user1 = user;
      
    });
  },2000)
    */
  }

  ngOnInit(): void {
 
  }
  getAllProducts(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/DATA");
  }

 addToCart(obj: any) : Observable<any> {
    //if(this.user1)
    //this.user.profile();
    return this.http.post<any>("http://localhost:3000/CART",obj);
 }
 /*
  addToCart(obj: any): Observable<any> {
    const params = new HttpParams().set('id', String(this.user1.id));
    return this.http.post<any>("http://localhost:3000/signup/Cart", obj, { params });
  }*/
  
  getCartItemsByCustId(custId:number) : Observable<any[]>  {
    return this.http.get<any[]>("http://localhost:3000/CART?CustId=" + custId);
   
  }

  removeCartItemById(id:number) : Observable<any[]>  {
    return this.http.delete<any[]>("http://localhost:3000/CART/"+id);
  }
  makeSale(obj: any) : Observable<any> {
    return this.http.delete<any>("http://localhost:3000/CART",obj);
  }
  updateCartObject(id:number,obj:any):Observable<any>{
    return this.http.patch<any[]>("http://localhost:3000/CART/"+id,obj)
  }

}
