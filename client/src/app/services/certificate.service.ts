import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  readonly API_URL = 'https://devlab1.firma.digital';

  constructor(
    private http: HttpClient
  ) { }


  GenerateCertificate(user: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    let local_api_url = 'sign/pfx';
    let payload = {
      username: user
      , password: password
    }
    return this.http.post(this.API_URL + `/${local_api_url}`, payload, options);
  }

  EnrollUser(user: string, password: string, fullname: string, email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    let local_api_url = 'user';

    let payload = {
      username: user
      , password: password
      , fullname: fullname
      , email: email
    }
    debugger

    return this.http.post(this.API_URL + `/${local_api_url}`, payload, options);
  }

  ExternalAuthService(purchasecode: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let options = { headers: headers };
    if (purchasecode == 'test') {
      purchasecode = '1111-11';
    }
    const payload = { p_code: purchasecode };
  
    return this.http.post('https://auth.firma.digital', payload, options);
    // return  this.http.post('https://auth.firma.digital' ,params1, 
    // {
    //     headers:  headers,
    //     withCredentials: true,
    //     observe: 'response',
    //     //params: params1,
    //     responseType: 'text',
    //     reportProgress: true
    // });
  }
}
