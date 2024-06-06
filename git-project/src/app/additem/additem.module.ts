import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdditemComponent } from './additem.component';

const routes: Routes = [{ path: '', component: AdditemComponent }];
@NgModule({
  declarations: [
    AdditemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdditemModule { }
