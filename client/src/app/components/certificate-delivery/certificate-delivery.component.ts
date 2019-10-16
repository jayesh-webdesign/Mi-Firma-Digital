import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from './../../services/certificate.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certificate-delivery',
  templateUrl: './certificate-delivery.component.html',
  styleUrls: ['./certificate-delivery.component.scss'],
})
export class CertificateDeliveryComponent implements OnInit {
  model: {
    user: string
    password: string
  };
  // msg: string;
  constructor(
    private toastr: ToastrService,
    private certificateService: CertificateService
  ) {
    this.model = {
      user: null,
      password: null
    }
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
          this.DowloadPFXFile(PFXStream, 'Certificado');
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

  private DowloadPFXFile(PFXStream: string, filename: string) {
    const blob = new Blob([PFXStream], { type: 'application/x-pkcs12' });
    let url = window.URL.createObjectURL(blob);
    saveAs(blob, `${filename}.pfx`);
    window.open(url);
  }
}
