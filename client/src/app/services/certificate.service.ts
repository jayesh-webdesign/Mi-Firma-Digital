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
    return this.http.post(this.API_URL + `/${local_api_url}`, payload, options);
  }
}
