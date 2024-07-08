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
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Users', icon: 'pi pi-users', routerLink: '/dashboard/users' },
      { label: 'Products', icon: 'pi pi-bitcoin', routerLink: '/dashboard/Products' },
      { label: 'Employee', icon: 'pi pi-users', routerLink: '/dashboard/Employee' },
      { label: 'Stocks items', icon: 'pi pi-database', routerLink: '/dashboard/stocks' },
    ];
  }
}
