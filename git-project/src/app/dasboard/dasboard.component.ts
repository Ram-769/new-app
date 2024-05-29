import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {
  userCount:any=89;
  productCount:any=43;
  Employecount:any=34;
  
}
