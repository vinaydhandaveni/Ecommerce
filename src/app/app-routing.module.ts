import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { SaleComponent } from './pages/sale/sale.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
 
  {
    path:'products',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'sale',
    component:SaleComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:"full"
  },
  {
    path:'**',
    component:SaleComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
