import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // -------------------- this interceptor will be used in the providers  sections in app.module------------------------
  
  // to prevent accessing the api from unauthorized users, so only users with token can access
  constructor( private authservice: AuthService,
                private toast: NgToastService,
                private router: Router) 
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
    // .pipe(-------) to logout the user after the token expires
    return next.handle(request).pipe(
      
      catchError((err:any)=>
      {
        if(err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            //display the error message that the token was expired
            this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            // and redirect back to login page/home page
            this.router.navigate([''])

            //return throwError(()=> new Error("some other error occured"));
            //handle // if i will use refresh token
            //return this.handleUnAuthorizedError(request,next);
          }
          else {
            // Leave other types of errors untouched
            return throwError(() => err);
          }
        }
        return throwError(()=> new Error("some other error occured"))
      })
    );

    
  }
}
