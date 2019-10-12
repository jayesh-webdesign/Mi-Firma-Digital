import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.scss']
})
export class UploadCertificateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fileName = '';
  onSelectFile(event){
    console.log(event.target.files);
    console.log(event.target.files[0].name);
    return this.fileName = event.target.files[0].name;
  }

  onSubmit(f){
    console.log(f.value)
  }

}
