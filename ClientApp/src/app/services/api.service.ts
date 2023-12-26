import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../config/constants';
import { IArticle } from '../models/IArticle';
import { IUserLogin } from '../models/IUserLogin';
import { IUserRegister } from '../models/IUserRegister';
import { IUserInfo } from '../models/IUserInfo';
import { IEditUsername } from '../models/IEditUsername';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor( private http: HttpClient) 
  { }


  // to add article
  AddArticle(articleObj: IArticle)
  {
    const url = `${Constants.api_url}/Articles/addarticle`;
    return this.http.post<any>(url, articleObj);
  }

  GetArticleById(articleId: number)
  {
    const url = `${Constants.api_url}/Articles/${articleId}`;
    //error //const url = `${Constants.api_url}/Articles?id=${articleId}`;

    return this.http.get<any>(url);
  }

  // --------------------------------------------------------------------------------------------------

  // LOGIN  // POST: api/Login/login
  login (userObj : IUserLogin)
  {
    const url = `${Constants.api_url}/Login/login`;

    return this.http.post<any>(url, userObj);
  }

  // Register/ Create a new user
  signup (userObj: IUserRegister)
  {
    const url = `${Constants.api_url}/Users/signup`;
    
    return this.http.post<any>(url, userObj );
  }
  
  


  // ------------------------ USERS page --------------------
  get_all_users ()
  {
    const url = `${Constants.api_url}/Users/get-all-users`;

    return this.http.get<IUserInfo[]>(url);
  }

  edit_username (edit_username_Obj: IEditUsername)
  {
    const url = `${Constants.api_url}/Users/edit-username`;

    return this.http.put<any[]>(url, edit_username_Obj);
  }


  // Method to change user password
  changeUserPassword(userId: number, changePasswordRequest: ChangePasswordRequest)
  {
    const url = `${Constants.api_url}/Users/PatchUserPassword/${userId}`;

    return this.http.patch<any>(url, changePasswordRequest);
  }


  // Method to change user password
  changeUserPassword_ForAdmin(userId: number, new_password: string )
  {
    const url = `${Constants.api_url}/Users/PatchUserPasswordAdmin/${userId}`;

    return this.http.patch<any>(url, {new_password});
  }

  

}
