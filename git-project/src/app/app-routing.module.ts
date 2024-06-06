import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RenderchildComponent } from './renderchild/renderchild.component';
import { SinupComponent } from './sinup/sinup.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {path:'welcome',component:WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sinup', component: SinupComponent },
 
  {
    path: 'dashboard',
    component: RenderchildComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dasboard/dasboard.module').then(m => m.DasboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'Employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'stocks',
        loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule)
      },
      {
        path: 'Products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule) 
      },
      {
        path: 'additem',
        loadChildren: () => import('./additem/additem.module').then(m => m.AdditemModule) 
      },
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
