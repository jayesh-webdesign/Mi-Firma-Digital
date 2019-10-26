import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";
import { AddPurchaseCode } from "../../auth/user-info";
import { TokenStorageService } from "../../services/token-storage.service";
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'purchase-code-verification',
  templateUrl: './purchase-code-verification.component.html',
  styleUrls: ['./purchase-code-verification.component.scss']
})

export class PurchaseCodeVerificationComponent implements OnInit {


  // Recaptcha Validation
  captchaResolved = false;
  public resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captchaResolved = true;
  }

  

  // Submitting the form
  form: any = {};
  addPurchaseCode: AddPurchaseCode;
  errorMessage = '';
  isSignedUp = false;
  signupFailed = false;
  formdata = {
    pursharse_code : null
  , password:null
  };
  constructor(private authService: AuthService,  private tokenStorage: TokenStorageService, private router: Router) {}
  ngOnInit() { 
    this.tokenStorage.clearToken() 
    this.form.purchasecode='11111-111'
  }

  onSubmit(f:any) {
    if(this.captchaResolved === false){
      this.errorMessage = 'Por favor complete Captcha';
      this.signupFailed = true;
      return true;
    }
    // Assign the values
    this.addPurchaseCode = new AddPurchaseCode(
        this.form.purchasecode
    );
    this.formdata.pursharse_code= this.form.purchasecode;
   
    this.authService.addPurchasecode(this.addPurchaseCode).subscribe(
      data => {
        // console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        if( data.message === undefined || data.message === 'Purchase code alredy registered'){
          this.isSignedUp = true;
          sessionStorage.setItem('router','upload-certificate');
          // this.router.navigate(['/upload-certificate']), { state: formdata };
          this.router.navigateByUrl('/upload-certificate', { state: this.formdata });
          // console.log('/upload-certificate')
          return true;
        }
        if( data.message === 'User alredy registered' ){
          sessionStorage.setItem('router','user-profile');
          // this.router.navigate(['/user-profile']);
          this.router.navigateByUrl('/user-profile', { state: {formdata:this.formdata,userInfo:data['userInfo']} });

          // console.log('/user-profile')
        }
      },
      error => {
        this.errorMessage = error.error;
        this.signupFailed = true;
      }
    );
  }
}

// Timeout Handle for recapcha
RecaptchaComponent.prototype.ngOnDestroy = function() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}