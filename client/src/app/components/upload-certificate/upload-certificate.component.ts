import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.scss']
})
export class UploadCertificateComponent implements OnInit {

  public uploadVerified : boolean = false;
  formdata = {
    pursharse_code : null
  , password:null
  };
  constructor(private router:Router) { 
    
    // console.log(this.router.getCurrentNavigation().extras.state);
    let info = this.router.getCurrentNavigation().extras.state;
    if(this.router.getCurrentNavigation().extras.state){
      this.formdata.pursharse_code = info.pursharse_code;
      this.formdata.password = info.password;
    }
  }

  ngOnInit() {
    if (sessionStorage.getItem('router') != 'upload-certificate') {
      this.router.navigate(['/']);
    }
    
    // clear certificate_status from storage
    sessionStorage.removeItem('certificate_status');
    // And router
    sessionStorage.removeItem('router');
    

    document.addEventListener('storage', ()=>{
      if(sessionStorage.getItem("certificate_status") === "uploaded") {
        this.uploadVerified = true;
      }
    } );
  }
  

  onSubmit(f){
    // console.log(f.value);
    // window.location.reload();
    sessionStorage.setItem('router' , 'user-profile');
    // this.router.navigate(['/user-profile']);
    // console.log(this.formdata);
    this.router.navigateByUrl('/user-profile', { state: this.formdata });
  }

}
