import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";

import { JwtResponse } from "../auth/jwt-response";
import { AddPurchaseCode, UserInfo } from "../auth/user-info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = 'api/user/signup';
  private profileUpdateUrl = 'api/user/update';
  private purchasecodeUrl = 'api/user/purchasecode';
  private userProfileUrl = 'api/user/profile';
  
  constructor(private http:HttpClient) {}

    signUp(info: UserInfo): Observable<any> {
      return this.http.post(this.signUpUrl, info, httpOptions);
    }

    addPurchasecode(info: AddPurchaseCode): Observable<JwtResponse> {
      return this.http.post<JwtResponse>(this.purchasecodeUrl, info, httpOptions);
    }

    userProfile(): Observable<any>{
      return this.http.post(this.userProfileUrl, httpOptions);
    }

    userProfileUpdate(info: UserInfo): Observable<any>{
      return this.http.put(this.profileUpdateUrl, info, httpOptions);
    }

    userAuth(){
      return !!sessionStorage.getItem('accessToken');
    }
}
