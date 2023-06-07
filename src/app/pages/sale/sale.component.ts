import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {
  subTotal:number=0;
  cartProducts :any[]=[];

  saleObj: any =  {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "Paytmm ",
    "DeliveryAddress1": "FLat302",
    "DeliveryAddress2": "Behind KFC",
    "DeliveryCity": "Hyd",
    "DeliveryPinCode": "500091",
    "DeliveryLandMark": "KFC"
};
user1:any;
  constructor(private productService:ProductService, private router:Router,private user:UserService){
    this.loadCart();
    /*this.user.profile().subscribe((user: any) => {
      this.user1 = user;
      */
    
  }

  loadCart() {
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(this.user1.id).subscribe((res: any)=> {
      this.cartProducts = res;
      this.cartProducts.forEach(element => {
          this.subTotal =  this.subTotal + element.productPrice;
      });
    })
  }

  remove(id:number){
    this.productService.removeCartItemById(id).subscribe((res:any)=>{
    
      this.loadCart();
      this.productService.cartAddedSubject.next(true);

      
    })
  }
  makeSale() {
    for(let i=0;i<this.cartProducts.length;i++){
      debugger;
      this.remove(i+1);
    }
    alert("sale success");
    this.router.navigate(['products']);
    /*
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.makeSale( this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert("Sale Success")
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
      
    })*/
  }

  
}
