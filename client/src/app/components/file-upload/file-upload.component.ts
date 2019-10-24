import { Component } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

import { FileService } from '../../services/file.service';
import {saveAs} from 'file-saver';
 
const URL = 'api/file/upload-certificate';
 
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers:[FileService]
})

export class FileUploadComponent {
  
  public uploader:FileUploader = new FileUploader({
    url: URL,
  });
  
  attachmentList:any = [];

  constructor(private _fileService:FileService){

    // Upload
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
      sessionStorage.setItem("certificate_status","uploaded");
      "use strict";
      var event = document.createEvent("Event");
      event.initEvent("storage", true, true);
      document.dispatchEvent(event);
    }
  }

  // Download
  download(index){
    var filename = this.attachmentList[index].uploadname;

    this._fileService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
  }
}