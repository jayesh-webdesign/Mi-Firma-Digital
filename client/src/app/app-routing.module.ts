import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseCodeVerificationComponent } from './purchase-code-verification/purchase-code-verification.component';
import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';


const routes: Routes = [
  {
    path: '',
    component: PurchaseCodeVerificationComponent
  },
  {
    path: 'upload-certificate',
    component: UploadCertificateComponent
  },
  {
    path: 'upload-certificate',
    component: UploadCertificateComponent
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
