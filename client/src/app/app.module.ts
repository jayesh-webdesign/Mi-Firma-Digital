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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { AuthGuard } from './auth/auth.guard';
import { CertificateDeliveryComponent } from './components/certificate-delivery/certificate-delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    PurchaseCodeVerificationComponent,
    UploadCertificateComponent,
    UserProfileComponent,
    GenerateCertificateComponent,
    CertificateDeliveryComponent,
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
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
