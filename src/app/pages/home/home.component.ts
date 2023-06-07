import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  prodlist: any[]=[];
  cartProducts:any[]=[];
  cartObj : any = {
    CartId: 0,
    CustId: 1,
    productId: 0,
    Quantity: 0,
    productImageUrl:'',
    productPrice:0,
    productName:''
  };
  subTotal: number | undefined;
  user1:any;
  constructor(private prod:ProductService ,private user:UserService){
   // this.getUser();
      
   
      
    
  }

  ngOnInit(): void {
    this.getUser();
    this.loadAllProducts();
    
    
  }


getUser(){
  debugger;
  this.user.profile().subscribe((result:any)=>{
    console.log(result.user);
    debugger;
    this.user1=result.user;
  });
}

  

  loadCart(){
    console.log(this.user1);
    let id=this.user1.id;
    debugger;
    this.prod.getCartItemsByCustId(id).subscribe((res: any)=> {
      this.cartProducts = res;
      debugger;
    
    })
  
  }
  loadAllProducts(){
    this.prod.getAllProducts().subscribe((result:any)=>{
      this.prodlist=result;
      this.loadCart();
      this.prod.cartAddedSubject.next(true);
    });

  }

 addItem(product:any){
  this.addItemToCart(product);
 }

  addItemToCart(product: any) {
    this.loadCart();
    let tof:boolean=false;
    let id:number=0;
    this.cartObj.productId = product.productId;
    this.cartObj.productImageUrl=product.productImageUrl;
    this.cartObj.productName=product.productName;
    this.cartObj.productPrice=product.productPrice;
    this.cartObj.CustId=this.user1.id;
    for(let i=0;i<this.cartProducts.length;i++){
      if(this.cartProducts[i].productId==product.productId){
          this.cartObj.Quantity+=1;
          this.cartObj.productPrice*=this.cartObj.Quantity;
          id=this.cartProducts[i].id;
          tof=true;
      }

    }
    if(tof==false){
      this.cartObj.Quantity=1;
      debugger;
    this.prod.addToCart(this.cartObj).subscribe((result: any)=>{
     
        alert("Product Added To Cart");
        this.prod.cartAddedSubject.next(true);
       
    })
  }
  else{
    debugger;
    this.prod.updateCartObject(id,this.cartObj).subscribe((result:any)=>{
      alert("Product Added To Cart");
        this.prod.cartAddedSubject.next(true);
    })
  }
  }

}
