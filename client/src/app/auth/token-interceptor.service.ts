import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

    intercept(req, next){
      let tokenservice = this.injector.get(TokenStorageService);
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization : `Bearer ${tokenservice.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
    }

}
