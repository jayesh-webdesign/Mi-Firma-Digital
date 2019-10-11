import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseCodeVerificationComponent } from './purchase-code-verification/purchase-code-verification.component';
import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { GenerateCertificateComponent } from "./generate-certificate/generate-certificate.component";
import { CertificateDeliveryComponent } from './components/certificate-delivery/certificate-delivery.component';
import { AuthGuard } from "./auth/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: PurchaseCodeVerificationComponent
  },
  {
    path: 'upload-certificate',
    component: UploadCertificateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generate-cirtificate',
    component: GenerateCertificateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'CertificateDelivery', 
    component:  CertificateDeliveryComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
