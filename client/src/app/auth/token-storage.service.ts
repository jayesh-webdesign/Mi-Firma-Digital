import { Injectable } from '@angular/core';

// Token
const TOKEN_KEY = 'accessToken';
// Purchase code
const CODEKEY = 'Purchase code';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // clear Token
  clearToken(){
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveAuthCode(p_code: string) {
    window.sessionStorage.removeItem(CODEKEY);
    window.sessionStorage.setItem(CODEKEY, p_code);
  }

  public getAuthCode(): string {
    return sessionStorage.getItem(CODEKEY);
  }

}




// "auth": true,
// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTcwNjk1MDk5LCJleHAiOjE1NzA3ODE0OTl9.HoUaXYbo_OXVrT7dPKNbqfjSY0NfPJHItedgWWQrfCU",
// "p_code": 2