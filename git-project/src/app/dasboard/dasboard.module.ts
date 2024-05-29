import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DasboardComponent } from './dasboard.component';

const routes : Routes = [
  {path:'',component:DasboardComponent
}
]

@NgModule({
  declarations: [
    DasboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule

  ]
})
export class DasboardModule { }
