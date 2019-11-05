import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { format } from '@dgitals/rut'
import { validate } from '@dgitals/rut'
import { clean } from '@dgitals/rut'

import { AuthService } from "../../services/auth.service";
import { UserInfo } from "../../auth/user-info";
import { CertificateService } from './../../services/certificate.service';



@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // Declaration
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate: Date;
  userInfo: UserInfo;
  ngForm: any;
  form: any = {};
  errorMessage = '';
  formdata = {
    pursharse_code: null
    , password: null
    , username: null
    , fullname: null
    , email: null
  };
  date:any;
  isDateTouched:boolean = false;

  // RUT validation
  isRutValid: boolean = false;
  RUT: string;
  DV: string;

  cert_flg: boolean =  false;
  certInfo: any = {};

  rutValidation(rut) {
    // 7903486k
    if (rut) {
      let formatedRUT = format(rut.value);
      let validateRUT = validate(formatedRUT);
      if (validateRUT) {
        this.isRutValid = true;
        let rutDv = formatedRUT.split('-');
        this.RUT = clean(rutDv[0]);
        this.DV = rutDv[1];
      }
      else {
        return this.isRutValid = false;
      }
    }
  }

  constructor(
    private router: Router,
    private authservice: AuthService,
    private certificateService: CertificateService
  ) {
    this.bsConfig = Object.assign({},
      { containerClass: 'theme-dark-blue' },
      {
        isAnimated: true, dateInputFormat: 'DD-MM-YYYY',
        adaptivePosition: true,
        showWeekNumbers: false
      });
    // Max Date
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());

    // console.log(this.router.getCurrentNavigation().extras.state);
    let info = this.router.getCurrentNavigation().extras.state;
    if (info) {
      if (info.formdata) {
        this.formdata.pursharse_code = info.formdata.pursharse_code;
        this.formdata.password = info.formdata.password;
      }
      // if (info.userInfo) {
      //   this.form.rut = info.userInfo.rut + '-' + info.userInfo.dv;
      //   this.RUT = info.userInfo.rut;
      //   this.DV = info.userInfo.dv;
      //   this.form.f_name = info.userInfo.f_name;
      //   this.form.l_name = info.userInfo.l_name;
      //   this.form.email = info.userInfo.email;
      //   this.form.serie = info.userInfo.series;
      //   this.form.m_l_name = info.userInfo.m_l_name;
      //   let date = info.userInfo.b_date.split('-');
      //   this.form.datepicker = date[2] + '-' + date[1] + '-' + date[0];
      //   // this.form.clave=info.userInfo.;
      // }

      this.cert_flg = info.cert_flg;
      this.certInfo = info.certInfo
    
      // if (info.cert_flg) {
      //   if (info.certInfo) {
      //     // console.log(info.certInfo);
      //     const rutSplit = info.certInfo.rut.split('-');

      //     this.form.rut = info.certInfo.rut;
      //     this.RUT = rutSplit[0];
      //     this.DV = rutSplit[1];
      //     this.ngForm.flg_full_name = true;
      //     this.form.full_name = info.certInfo.name;
      //     this.form.f_name = null;
      //     this.form.l_name = null;
      //     this.form.email = info.certInfo.email;
      //     this.form.serie = null;
      //     this.form.m_l_name = null;
      //     this.form.datepicker = null;
      //   }
      // }
    }
  }

  ngOnInit() {
    if (sessionStorage.getItem('router') != 'user-profile') {
      this.router.navigate(['/']);
    }

    // Retriving Userdata if user already registered
    if (this.cert_flg) {
        if (this.certInfo) {
          // console.log(this.certInfo);
          const rutSplit = this.certInfo.rut.split('-');
          // this.form.rut = this.certInfo.rut;
          // this.ngForm.flg_full_name = true;
          // this.form.full_name = this.certInfo.name;
          // this.form.f_name = null;
          // this.form.l_name = null;
          // this.form.email = this.certInfo.email;
          // this.form.serie = null;
          // this.form.m_l_name = null;
          // this.form.datepicker = null;

          this.ngForm = {
            f_name: null,
            l_name: null,
            m_l_name: null,
            flg_full_name: true,
            full_name: this.certInfo.name,
            email: this.certInfo.email,
            rut: this.certInfo.rut,
            series: null,
            b_date: null,
            status: 'existing'
          }
          this.RUT = rutSplit[0];
          this.DV = rutSplit[1];
          // console.log(this.ngForm.rut);
          // console.log(this.RUT);
          // console.log(this.DV);
        }
    } else {
      this.authservice.userProfile().subscribe(
        data => {
          if (data !== null) {
            this.date = data.b_date
            this.date = this.date.split('-')
            this.ngForm = {
              f_name: data.f_name,
              l_name: data.l_name,
              email: data.email,
              rut: data.rut + data.dv,
              series: data.series,
              m_l_name: data.m_l_name,
              b_date: (parseInt(this.date[2], 10) + 1) + '-' + this.date[1] + '-' + this.date[0],
              status: 'existing',
              flg_full_name: false,
              full_name: null
            }
            this.RUT = data.rut;
            this.DV = data.dv
          } else {
            this.ngForm = {
              f_name: null,
              l_name: null,
              email: null,
              rut: null,
              series: null,
              m_l_name: null,
              b_date: null,
              status: 'new',
              flg_full_name: false,
              full_name: null
            }
          }
        }
      );
    }
  }

  onSubmit(form) {
    // Assign the values
    if (this.ngForm.status === 'existing') {
      this.userInfo = new UserInfo(
        this.ngForm.f_name,
        this.ngForm.l_name,
        this.ngForm.email,
        this.RUT,
        this.DV,
        this.ngForm.series,
        this.ngForm.m_l_name,
        this.isDateTouched? this.ngForm.b_date : this.date.join('-') ,
      );

      this.formdata.password = this.ngForm.key;
      this.formdata.username = this.RUT + '-' + this.DV;
      this.formdata.fullname =this.ngForm.flg_full_name?this.ngForm.full_name:(this.ngForm.f_name + ' ' + this.ngForm.l_name + ' ' + this.ngForm.m_l_name);
      this.formdata.email = this.ngForm.email;

      this.authservice.userProfileUpdate(this.userInfo).subscribe(
        data => {
          if (data) {
            // console.log(data)
            alert(data.success)
            // this.router.navigate(['/CertificateDelivery']);
            // return true;

            this.certificateService.EnrollUser(this.formdata.username, this.formdata.password, this.formdata.fullname, this.formdata.email)
            .subscribe(
              (data: any) => {
                debugger
                // console.log(data);
                sessionStorage.setItem('router', 'generate-certificate');
                this.router.navigateByUrl('/generate-certificate', { state: this.formdata });
              },
              (err) => {
                if (err.error.status == 400) {
                }
              },
              () => {
              }
            );
          }
        }
      )
    } else {
      // 7903486k
      this.userInfo = new UserInfo(
        this.ngForm.f_name,
        this.ngForm.l_name,
        this.ngForm.email,
        this.RUT,
        this.DV,
        this.ngForm.series,
        this.ngForm.m_l_name,
        this.ngForm.b_date,
      );

      this.formdata.password = this.ngForm.key;
      this.formdata.username = this.RUT + '-' + this.DV;
      this.formdata.fullname =this.ngForm.flg_full_name?this.ngForm.full_name:(this.ngForm.f_name + ' ' + this.ngForm.l_name + ' ' + this.ngForm.m_l_name);
      this.formdata.email = this.ngForm.email


      this.authservice.signUp(this.userInfo).subscribe(
        data => {
          if (data) {
            // console.log(data)
            if (data.message === "RUT already exist") {
              alert("El usuario ya existe con este RUT")
            } else if (data.message === "Email already exist") {
              alert("El usuario ya existe con este Email")
            } else {
              alert(data.success)
              // window.location.reload();
              this.certificateService.EnrollUser(this.formdata.username, this.formdata.password, this.formdata.fullname, this.formdata.email)
                .subscribe(
                  (data: any) => {
                    debugger
                    // console.log(data);
                    sessionStorage.setItem('router', 'generate-certificate');
                    this.router.navigateByUrl('/generate-certificate', { state: this.formdata });
                  },
                  (err) => {
                    if (err.error.status == 400) {
                    }
                  },
                  () => {
                  }
                );


              // return true;
            }
          }
        }
      )
    }
  }
}
