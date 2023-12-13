import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from  '@angular/router';
import { NgToastService } from 'ng-angular-popup';

// to decrypt the token to get the user data from it
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user payload data that will be fetched from the token when decoding
  private userPayload: any;

  constructor( private http: HttpClient,
                private router: Router,
                private toast: NgToastService) 
  {
    this.userPayload = this.decodeTokenOfUser();
  }

  // when user log in, store the token to local storage ( the token is generated at api side and returned with the user sucess login messgae)
  storeToken(sentTokenValue: string)
  {
    localStorage.setItem('token', sentTokenValue);
    // test
    //console.log(localStorage.getItem('token'));
  }

  //check if user is logged in by checking if the user has token in local storage
  isloggedIn():boolean 
  {
    // return true if user is logged in and false otherwise
    return !!localStorage.getItem('token')
  }

  signOut()
  {
    // delete the user's token
    localStorage.clear();
    //localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.toast.info({ detail:"success", summary: "تم تسجيل الخروج", duration: 4000, position:'topRight'});
  }





  // to get token information to validate in the interceptor
  getToken()
  {
    return localStorage.getItem('token');
  }







  // to decode the token to get user information from it
  // this function is used in the constructor and the result is stored in userPayload object
  decodeTokenOfUser()
  {
    const jwtHelper = new JwtHelperService();

    const token = this.getToken()!;

    // test
    //console.log(jwtHelper.decodeToken(token)) //done

    // this will return the payload data from the token
    return jwtHelper.decodeToken(token);
  }

  // get name from the decoded token
  getNameFromToken()
  {
    // if not null -- the userpayload holds the result of the decoded token
    if ( this.userPayload)
    {
      return this.userPayload.name;
    }
  }
  getRoleFromToken()
  {
    if ( this.userPayload)
    {
      return this.userPayload.role;
    }

  }
  

}
