import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UsersModule { }
