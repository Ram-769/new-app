import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipsModule } from 'primeng/chips';
import {PanelModule} from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { animation } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    TriStateCheckboxModule,
    HttpClientModule,
    TableModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    RadioButtonModule,
    PanelModule,
    RouterModule,
    FormsModule,
    ChipsModule,
    ToastModule,
    AccordionModule,
    MegaMenuModule,
    BrowserAnimationsModule
    
  ],
  exports:[
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    TriStateCheckboxModule,
    HttpClientModule,
    TableModule,
    FileUploadModule,
    CalendarModule,
    CheckboxModule,
    RouterModule,
    FormsModule,
    RadioButtonModule,
    PanelModule,
    ChipsModule,
    AccordionModule,
    ToastModule,
    ListboxModule,
    MegaMenuModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {
  
 }
