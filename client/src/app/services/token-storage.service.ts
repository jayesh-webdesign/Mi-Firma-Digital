import { Injectable } from '@angular/core';

// Token
const TOKEN_KEY = 'accessToken';
// Purchase code
const PURCHASECODE = 'Purchase code';
// Id
const USERID = 'Use id'

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
    window.sessionStorage.removeItem(PURCHASECODE);
    window.sessionStorage.setItem(PURCHASECODE, p_code);
  }

  public getAuthCode(): string {
    return sessionStorage.getItem(PURCHASECODE);
  }

  public saveId(id : string) {
    return sessionStorage.setItem(USERID, id);
  }

  public getId(): String {
    return sessionStorage.getItem(USERID);
  }

}
