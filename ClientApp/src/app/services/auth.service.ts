import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from  '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient,
                private router: Router,
                private toast: NgToastService) 
  { }

  // when user log in, store the token to local storage ( the token is generated at api side and returned with the user sucess login messgae)
  storeToken(sentTokenValue: string)
  {
    localStorage.setItem('token', sentTokenValue);
    
    // test
    console.log(localStorage.getItem('token'));
  }

  //check if user is logged in by checking if the user has token in local storage
  isloggedIn():boolean 
  {
    // return true if user is logged in and false otherwise
    return !!localStorage.getItem('token')
  }

  signOut()
  {
    localStorage.clear();
    //localStorage.removeItem('token');
    
    this.router.navigate(['/']);

    this.toast.info({ detail:"Info", summary: "تم تسجيل الخروج", duration: 4000, position:'topCenter'});
  }



  // to get token information to validate in the interceptor
  getToken()
  {
    return localStorage.getItem('token');
  }
  

}
