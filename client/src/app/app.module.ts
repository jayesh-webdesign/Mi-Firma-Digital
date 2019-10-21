import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from "ng2-file-upload";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { PurchaseCodeVerificationComponent } from './components/purchase-code-verification/purchase-code-verification.component';
import { UploadCertificateComponent } from './components/upload-certificate/upload-certificate.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GenerateCertificateComponent } from './components/generate-certificate/generate-certificate.component';
import { AuthGuard } from './auth/auth.guard';
import { CertificateDeliveryComponent } from './components/certificate-delivery/certificate-delivery.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TokenInterceptorService } from "./auth/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    PurchaseCodeVerificationComponent,
    UploadCertificateComponent,
    UserProfileComponent,
    GenerateCertificateComponent,
    CertificateDeliveryComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    HttpClientModule,
    FileUploadModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
