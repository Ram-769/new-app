import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
   { path: 'login', component: LoginComponent  },
   {path:'**', component:PagenotfoundComponent},
  //  {
  //    // canActivate:[authGuard],
  //    path: 'Dashbard',
  //    component: RendercredentailsComponent,    
  //    children: [
 
  //      {
  //        path: '',
  //        loadChildren: () =>
  //          import('./manageusers/manageusers.module').then(
  //            (m) => m.ManageusersModule
  //          ),
  //      },
  //      {
  //        path: 'users',
  //        loadChildren: () =>
  //          import('./users/users.module').then(
  //            (m) => m.UsersModule
  //          ),
  //      },
  //      {
  //        path: 'Employee',
  //        loadChildren: () =>
  //          import('./employee/employee.module').then(
  //            (m) => m.EmployeeModule
  //          ),
  //      },
  //      {
  //        path: 'Products',
  //        loadChildren: () =>
  //          import('./products/products.module').then(
  //            (m) => m.ProductsModule
  //          ),
  //      },
  //      {
  //        path: 'stocks',
  //        loadChildren: () =>
  //          import('./stocks/stocks.module').then(
  //            (m) => m.StocksModule
  //          ),
  //      },
  //      {
  //        path: 'prod_category',
  //        loadChildren: () =>
  //          import('./prod-category/prod-category.module').then(
  //            (m) => m.ProdCategoryModule
  //          ),
  //      },
 
  //      {path:'**', component:PagenotfoundComponent},
 
  //    ],
  //  },
  //  { path: '**', redirectTo: '' }  
  //  // { path: '233', component: LandingpageComponent },
  //  // { path: 'sinup', component: SinupComponent },
  //  // { path: 'login', component: LoginComponent },
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes,  { onSameUrlNavigation: 'reload' })],
  
  exports: [RouterModule],
})
export class AppRoutingModule { }
