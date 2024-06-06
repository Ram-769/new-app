import { NgModule } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MasterService } from './master.service';
import { MessageService } from 'primeng/api';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MenulistComponent } from './menulist/menulist.component';
import { RenderchildComponent } from './renderchild/renderchild.component';
import { DispalychildComponent } from './dispalychild/dispalychild.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';

import { TableModule } from 'primeng/table';
import { SinupComponent } from './sinup/sinup.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    HomeComponent,
    MenulistComponent,
    RenderchildComponent,
    DispalychildComponent,
    SinupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ChartModule,
    TableModule
 
  ],
  providers: [MasterService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
