import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../auth/auth.service";
import { AddPurchaseCode } from "../auth/user-info";
import { TokenStorageService } from "../auth/token-storage.service";

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

  constructor(private authService: AuthService,  private tokenStorage: TokenStorageService, private router: Router) {}
  ngOnInit() { }

  onSubmit() {
    if(this.captchaResolved === false){
      this.errorMessage = 'Please Complete Captcha';
      this.signupFailed = true;
      return true;
    }

    this.addPurchaseCode = new AddPurchaseCode(
        this.form.purchasecode
    );
    this.authService.signUp(this.addPurchaseCode).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveAuthCode(data.p_code);
        this.isSignedUp = true;
        this.router.navigate(['/upload-certificate']);
        
      },
      error => {
        console.log(error);
        this.errorMessage = error.error;
        this.signupFailed = true;
      }
    );
  }


  

}