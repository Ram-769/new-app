import { Component } from '@angular/core';

@Component({
  selector: 'app-renderchild',
  templateUrl: './renderchild.component.html',
  styleUrls: ['./renderchild.component.css']
})
export class RenderchildComponent {
  public changepassword:any='/resetpassword';
  navigation(){
    localStorage.removeItem("roles")
    localStorage.removeItem("create_data")
    localStorage.removeItem("myData")
    window.location.href = '/login';
  }
}
