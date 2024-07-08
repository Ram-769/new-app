import { MasterService } from './../master.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as confetti from 'canvas-confetti';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  public isResetKey:boolean=false;
  public isChangeKey:boolean=false;
  public hiddentab:boolean=true;
  public otp = {
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    fourthDigit: "",
    "flag": "v"
  }
public payload:any={
  email:'',
  oldPassword:"",
  newPassword:"",
  otp:this.otp.firstDigit+""+this.otp.secondDigit+this.otp.thirdDigit+this.otp.fourthDigit
}
public defaultpayload: any = JSON.parse(JSON.stringify(this.payload));
constructor(private msgService: MessageService,public MasterService:MasterService){}
async ChangePassword(){
  this.isChangeKey=true;
  this.hiddentab =false


      if (this.payload.password == '' || this.payload.email == '' || this.payload.oldPassword =="") {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'username and passord and Captcha  required!',
      });
      return;
    }
    else{
 
      let payload = {
        email: this.payload.email,
        newPassword: this.payload.newPassword, 
        oldPassword: this.payload.oldPassword,
      };
      let apitype = 'post';
      let data = await this.MasterService.postApiCall(await this.MasterService.getApiPath('changepassword'), apitype, payload);
  
      if (data['status'] == 200) {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: data['message'] });
        this.payload = this.defaultpayload;
       await  this.wait (10000)
        //window.location.href = '/login';
      } else {
        this.msgService.add({ severity: 'info', summary: 'Info',detail:data['message']  });

      }
    }
       
  
}

forgetPassword(){

}
ResetPassword(){
  this. isResetKey=true;
  this.hiddentab =false
}

changeFocus(data: any, next: any, prev: any) {
  if (data.length == 1) {
      const nextElement = document.getElementById(next);
      if (nextElement) {
          nextElement.focus();
      }
  } else {
      const prevElement = document.getElementById(prev);
      if (prevElement) {
          prevElement.focus();
      }
  }
}
sentOtp(){

}
wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
}
