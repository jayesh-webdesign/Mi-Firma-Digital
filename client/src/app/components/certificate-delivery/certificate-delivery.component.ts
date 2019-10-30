import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from './../../services/certificate.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-delivery',
  templateUrl: './certificate-delivery.component.html',
  styleUrls: ['./certificate-delivery.component.scss'],
})
export class CertificateDeliveryComponent implements OnInit {
  model: {
    user: string
    password: string
  }= {
       user: null,
       password: null
     }
  // msg: string;
  constructor(
    private toastr: ToastrService,
    private certificateService: CertificateService,
    private router: Router

  ) {
    // console.log(this.router.getCurrentNavigation().extras.state);
    let info = this.router.getCurrentNavigation().extras.state;
    if(this.router.getCurrentNavigation().extras.state){
      this.model.user = info.username;
      this.model.password = info.password;
      // this.model = {
      //   user: info.pursharse_code,
      //   password: info.password
      // }
    }
    // console.log(this.model);
    // this.model = {
    //   user: null,
    //   password: null
    // }
  }

  ngOnInit() {
    // this.toastr.success('Hello world!', 'Toastr fun!', {
    //   // disableTimeOut: true,
    //   positionClass: 'toast-center-center'
    // });
  }


  
  GetCertificate(form?: NgForm) {
    let { user, password } = form.value;
    // GenerateCertificate
    this.certificateService.GenerateCertificate(user, password)
      .subscribe(
        (data: any) => {
          // let PFXStream = data['PFX'];
          let { PFX: PFXStream } = data;
          const decodedData = atob(PFXStream);
          const uInt8Array = new Uint8Array(decodedData.length);
          for (let i = 0; i < decodedData.length; ++i) {
              uInt8Array[i] = decodedData.charCodeAt(i);
          }
          this.DowloadPFXFile(uInt8Array, user);
          form.reset();
        },
        (err) => {
          if (err.error.status == 400) {
            this.toastr.error('Ya se encuentra generado el certificado.', 'Error', {
              positionClass: 'toast-center-center',
              timeOut: 0,
              extendedTimeOut: 0,
              tapToDismiss: false,
              closeButton: true,
            });
          }
        },
        () => {
        }
      );
  }

  private DowloadPFXFile(PFXStream: Uint8Array, filename: string) {
    const blob = new Blob([PFXStream], { type: 'application/x-pkcs12' });
    
    saveAs(blob, `${filename}.pfx`);
  }
}
