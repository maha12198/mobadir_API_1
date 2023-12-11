import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // -------------------- this interceptor will be used in the providers  sections in app.module------------------------
  
  // to prevent accessing the api from unauthorized users, so only users with token can access
  constructor( private authservice: AuthService) 
  {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //get the token
    const token = this.authservice.getToken();

    if (token){
      // so add the token to the header to authorize the user
      request = request.clone(
        {
          // send the token in the request header to the api side (backend)
          // this can be checked in network tab check header of the request that has [authorize] in api side
          setHeaders: { Authorization: `Bearer ${token}` }
        }
      );
    }

    // then, send the request back
    return next.handle(request);
  }
}
