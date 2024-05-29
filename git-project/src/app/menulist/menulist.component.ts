import { Component ,OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.css']
})
export class MenulistComponent implements OnInit{
  public  item:MenuItem[]=[];
 
  ngOnInit() {
    this.item= [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/Dashbard' },
      { label: 'Users', icon: 'pi pi-users', routerLink: '/Dashbard/users' },
      { label: 'Products', icon: 'pi pi-bitcoin', routerLink: '/Dashbard/Products' },
      { label: 'Employee', icon: 'pi pi-users', routerLink: '/Dashbard/Employee' },
      { label: 'Stocks items', icon: 'pi pi-database', routerLink: '/Dashbard/stocks' },
    ];
  }
}
