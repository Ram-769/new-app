import { Component , ElementRef, ViewChild} from '@angular/core';
import { MasterService } from '../master.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent {
  public msg: any = '';
  password: string = '';
  hasUppercase: boolean = false;
  hasLowercase: boolean = false;
  hasNumber: boolean = false;
  hasSymbol: boolean = false;
  isValidPattern:boolean=false;
  public nodeOtp="";
  public captchaCode: any = '';
  passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\/\\])(?=.*\d).{8,}$/
  public isSuccessful = false;
  public uiData: any = [];
  public errorMsg: any = false;
  public isCaptcha: boolean = false;
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
  public isOtpfield=false;
  public defaultpayload: any = JSON.parse(JSON.stringify(this.payload));
  ngOnInit(): void {
    this.generateCaptcha();
  }

  async onSubmit() {
    if (this.payload.password == '' || this.payload.email == '' || this.payload.userCaptcha == '' || this.nodeOtp == this.payload.otp  ) {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'username passord Captcha and OTP  required !',
      });
      return;
    }
   
if( this.isCaptcha || this.errorMsg){
  this.generateCaptcha();
  if(this.isCaptcha ){    
    this.isCaptureMessage=true;
  }
  return;
}else{
 
    let payload = {
      email: this.payload.email,
      password: this.payload.password, 
    };
    let apitype = 'post';
    this.uiData = await this.ms.postApiCall(await this.ms.getApiPath('sinup'), apitype, payload);
   console.log( this.uiData ," this.uiData ")
    if (this.uiData['status'] == 200) {
      this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      console.log(this.uiData);
      // localStorage.setItem('Token', this.uiData['token']);
      // localStorage.setItem('User', this.uiData.data['userName']);
      this.payload = this.defaultpayload;
     window.location.href = '/dashboard';
    } else {
      this.msgService.add({ severity: 'info', summary: 'Info',detail: this.uiData.message });
      this.msg = this.uiData['message'];
      this.isSuccessful = true;
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

  if (this.payload.password == '' || this.payload.email == '' || this.payload.userCaptcha == '' ) {
    this.msgService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'username and passord and Captcha  required!',
    });
    return;
  }
  this.isOtpfield=true;
  let payload = {
    email: this.payload.email,
    password: this.payload.password, 
  };
  let apitype = 'post';
  this.uiData = await this.ms.postApiCall(await this.ms.getApiPath('requestotp'), apitype, payload);
  console.log(this.uiData,"this.uiData")
  this.msgService.add({
    severity: 'info', summary: 'Info', 
    detail:this.uiData.message,
  });
  if( this.uiData.status == 200){
    this.nodeOtp =this.uiData.data['otp']
  }
}

wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
}
