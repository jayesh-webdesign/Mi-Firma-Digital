import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";

import { JwtResponse } from "./jwt-response";
import { AddPurchaseCode } from "./user-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = 'http://localhost:3000/user/signup';
  // private profile = 'http://localhost:3000/user/profile';

  constructor(private http:HttpClient) {}

    signUp(info: AddPurchaseCode): Observable<JwtResponse> {
      return this.http.post<JwtResponse>(this.signUpUrl, info, httpOptions);
    }
}
