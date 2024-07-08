import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { MessageService } from 'primeng/api';
import { SessionTimerComponent } from '../session-timer/session-timer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public changepassword:any='/resetpassword';
  public msg: any = '';
  password: string = '';
  hasUppercase: boolean = false;
  hasLowercase: boolean = false;
  hasNumber: boolean = false;
  hasSymbol: boolean = false;
  isValidPattern:boolean=false;
  public captchaCode: any = '';
  passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\/\\])(?=.*\d).{8,}$/
  public isSuccessful = false;
  public uiData: any = [];
  public errorMsg: any = false;
  public isCaptcha: boolean = false;
  public isPassword:boolean =false;
  public isOtp:boolean=false;
  public loginmethod:any=true;
  public isOtpfield:boolean= false;
  public nodeOtp:any='';
  constructor(private ms: MasterService, private msgService: MessageService) {}
  public otp = {
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    fourthDigit: "",
    "flag": "v"
  }
  public payload: any = {
    userName: '',
    password: '',
    email: '',
    userCaptcha:'',
    otp:this.otp.firstDigit+""+this.otp.secondDigit+this.otp.thirdDigit+this.otp.fourthDigit

  };
  public defaultpayload: any = JSON.parse(JSON.stringify(this.payload));
  ngOnInit(): void {
    this.generateCaptcha();
  }

  async onSubmit() {
    if(this.isOtp == true){
      if (this.payload.otp != this.nodeOtp || this.payload.password == '' || this.payload.email == '' || this.payload.userCaptcha == '' ) {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'invalid otp!',
        });
        this.generateCaptcha();
        return;
      
      }else{
        window.location.href='/dashboard'
      }

      
    }else{
      if (this.payload.otp != this.nodeOtp || this.payload.password == '' || this.payload.email == '' || this.payload.userCaptcha == ''  || this.isCaptcha ||  this.errorMsg ) {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'username and passord and Captcha  required!',
      });
      this.generateCaptcha();
      return;
    }
    else{
 
      let payload = {
        email: this.payload.email,
        password: this.payload.password, 
      };
      let apitype = 'post';
      this.uiData = await this.ms.postApiCall(await this.ms.getApiPath('login'), apitype, payload);
     console.log( this.uiData['data'] ," this.uiData ")
      if (this.uiData['status'] == 200) {
        localStorage.setItem('roles',JSON.stringify(this.uiData.data.roles.master.roles)  )
        localStorage.setItem('Token',JSON.stringify(this.uiData.data.token)  )
        this.msgService.add({ severity: 'success', summary: 'Success', detail: this.uiData['message'] });
        this.sessionExpired();
        this.payload = this.defaultpayload;
        window.location.href = '/dashboard';
      } else {
        this.msgService.add({ severity: 'info', summary: 'Info',detail: this.uiData['message']  });
        this.isSuccessful=true;
      }
    }
    }
   
  }
  checkPasswordValidity() {
    this.hasUppercase = /[A-Z]/.test(this.payload.password)
    this.hasLowercase = /[a-z]/.test(this.payload.password)
    this.hasNumber = /[0-9]/.test(this.payload.password)
    this.hasSymbol = /[^a-zA-Z0-9]/.test(this.payload.password)
    this.isValidPattern =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\/\\])(?=.*\d).{8,}$/.test(this.payload.password)
    //  /^(?=.*[A-Z])[A-Z][a-z]+[!@#$%^&*()_+{}|:"<>?[\];',.\/\\]+\d+$/.test(this.payload.password);
    this.payload.userCaptcha=''
  }
  passwordVisible = false;
  generateCaptcha() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }   this.captchaCode = captcha;
  }
  checkValidatePassword(){
    if (!this.passwordRegex.test(this.payload.password)) {
      this.errorMsg = true;
      return;
    }else {
      this.errorMsg = false;
    }
    this.payload.userCaptcha=''
  }
  public isCaptureMessage:boolean = false;
  captchaChecking(){
    this.isCaptureMessage = false;
    if (this.payload.userCaptcha === this.captchaCode ) {
      this.isCaptcha = false;
    } else {
      this.isCaptcha = true;
    }
  }
  wait(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
  onLoginWithOtp() {
    this.loginmethod=false;
  this.isOtp=true;
  }

  onLoginWithPassword() {
    this.loginmethod=false;
this.isPassword=true;
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
async sentOtp(){

  if ( this.payload.email == '' || this.payload.userCaptcha == '' ) {
    this.msgService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'username and passord and Captcha  required!',
    });
    return;
  }

  let payload = {
    email: this.payload.email,
    otpvalidation:true 
  };
  let apitype = 'post';
  this.uiData = await this.ms.postApiCall(await this.ms.getApiPath('requestotplogin'), apitype, payload);
  console.log(this.uiData,"this.uiData")
  this.msgService.add({
    severity: 'info', summary: 'Info', 
    detail:this.uiData.message,
  });
  if( this.uiData.status == 200){
    this.nodeOtp =this.uiData.data['otp']
    console.log(this.nodeOtp,"this.nodeOtp")
    this.isOtpfield=true;
    this.sessionExpired();
  }else{
    this.isSuccessful = true;
  }
}
navigation(){
  localStorage.removeItem("roles")
  localStorage.removeItem("Token")
  window.location.href = '/login';
}
sessionExpired(){
  let component=new SessionTimerComponent()
  component.startTimer();
  }


}
