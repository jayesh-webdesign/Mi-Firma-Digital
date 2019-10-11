import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { PurchaseCodeVerificationComponent } from './purchase-code-verification/purchase-code-verification.component';
import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    PurchaseCodeVerificationComponent,
    UploadCertificateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
