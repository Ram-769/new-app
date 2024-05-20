import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public msg: any = '';
  password: string = '';
  hasUppercase: boolean = false;
  hasLowercase: boolean = false;
  hasNumber: boolean = false;
  hasSymbol: boolean = false;
  isValidPattern:boolean=false;
  public captchaCode: any = '';
  passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\/\\])(?=.*\d).{8,}$/
  // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\/\\])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}|:"<>?[\];',.\/\\]{8,}$/;
  // //^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\/\\])(?=.*[^\w\d\s])\S{8,}$/;

  public isSuccessful = false;
  public uiData: any = [];
  public errorMsg: any = false;
  public isCaptcha: boolean = false;
  constructor(private ms: MasterService, private msgService: MessageService) {}
  public payload: any = {
    userName: '',
    password: '',
    email: '',
    userCaptcha:''
  };
  public defaultpayload: any = JSON.parse(JSON.stringify(this.payload));
  ngOnInit(): void {
    this.generateCaptcha();
  }

  async onSubmit() {
    if (this.payload.password == '' || this.payload.email == '' || this.payload.userCaptcha == '' ) {
      this.msgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'username and passord and Captcha  required!',
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
 
  //   let payload = {
  //     email: this.payload.email,
  //     password: this.payload.password,
      
  //   };

  //   let apitype = 'post';
  //   this.uiData = await this.ms.postApiCall('/login', apitype, payload);
  //   if (this.uiData['statusCode'] == 200) {
  //     alert('Registration Success');
  //     console.log(this.uiData);
  //     localStorage.setItem('Token', this.uiData['token']);
  //     localStorage.setItem('User', this.uiData.data['userName']);
  //     this.payload = this.defaultpayload;
  //     window.location.href = '/Dashbard';
  //   } else {
  //     this.msg = this.uiData['message'];
  //     this.isSuccessful = true;
  //   }
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
}
