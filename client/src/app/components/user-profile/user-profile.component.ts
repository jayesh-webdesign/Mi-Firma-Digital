import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { format } from '@dgitals/rut'
import { validate } from '@dgitals/rut'
import { clean } from '@dgitals/rut'

import { AuthService } from "../../auth/auth.service";
import { UserInfo } from "../../auth/user-info";




@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate: Date;
  userInfo : UserInfo;   
  ngForm: any;
  form: any = {};
  errorMessage = '';

  // RUT validation
  isRutValid : boolean = false;
  RUT: string;
  DV : string;
  rutValidation(rut){
    // 7903486k
    if (rut) {
      let formatedRUT = format(rut.value);
      let validateRUT = validate(formatedRUT);
      if (validateRUT) {
        this.isRutValid = true;
        let rutDv = formatedRUT.split('-');
        this.RUT =  clean(rutDv[0]);
        this.DV = rutDv[1];
      }
      else{
        return this.isRutValid = false;
      }
    }
  }

  constructor(private router:Router, private authservice: AuthService) { 
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
   }

  ngOnInit() {
    if (sessionStorage.getItem('router') != 'user-profile') {
      this.router.navigate(['/']);
    }

    // Retriving Userdata if user already registered
    this.authservice.userProfile().subscribe(
      data => {
        // console.log(data)
        if (data !== null) {
          this.ngForm = {
            f_name: data.f_name,
            l_name: data.l_name,
            email: data.email,
            rut: data.rut + data.dv,
            series: data.series,
            m_l_name: data.m_l_name,
            b_date: data.b_date,
            key: data.key
          }
          this.RUT = data.rut;
          this.DV = data.dv
        }
      }
    );
  }

  onSubmit(form){
    // Assign the values
    if (this.ngForm) {
      this.userInfo = new UserInfo(
        this.ngForm.f_name,
        this.ngForm.l_name,
        this.ngForm.email,
        this.RUT,
        this.DV,
        this.ngForm.series,
        this.ngForm.m_l_name,
        this.ngForm.b_date,
        this.ngForm.key
      );
      this.authservice.userProfileUpdate(this.userInfo).subscribe(
        data => {
          if (data) {
            console.log(data)
            alert(data.success)
            return true;
          }
        }
      )
    }else{
      // 7903486k
      this.userInfo = new UserInfo(
        this.form.f_name,
        this.form.l_name,
        this.form.email,
        this.RUT,
        this.DV,
        this.form.serie,
        this.form.m_l_name,
        this.form.datepicker,
        this.form.clave
      );
      this.authservice.signUp(this.userInfo).subscribe(
        data => {
          if (data) {
            console.log(data)
            if (data.message === "RUT already exist") {
              alert("El usuario ya existe con este RUT")
            }else if(data.message === "Email already exist") {
              alert("El usuario ya existe con este Email")
            }else{
              alert(data.success)
              window.location.reload();
              return true;
            }
          }
        }
      )
    }
  }
}
