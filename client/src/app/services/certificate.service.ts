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
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    });

    let options = { headers: headers };
    let local_api_url = 'sign/pfx';
    // return this.http.get('../../assets/Test_Certificate.json');
    return this.http.post(this.API_URL + `/${local_api_url}`, { username: user, passwd: password }, options);
  }
}
