import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  subTotal=0;
  
  cartProducts: any[] = [];
  constructor(private productService:ProductService ,private router:Router){
    this.productService.cartAddedSubject.subscribe(res=>{
     this.loadCart();
    })
  }

  ngOnInit(): void {
    this.loadCart();
  }

  redirectToSale(){
    this.router.navigate(['sale']);
  }

  loadCart() {
    
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(0).subscribe((res: any)=> {
      this.cartProducts = res;
      this.cartProducts.forEach(element => {
          this.subTotal =  this.subTotal + element.productPrice;
      });
    
    })
  
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
 
}
