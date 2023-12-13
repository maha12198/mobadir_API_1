import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { IArticle } from '../models/IArticle';
import { IUserLogin } from '../models/IUserLogin';
import { IUserRegister } from '../models/IUserRegister';
import { IUserInfo } from '../models/IUserInfo';
import { IEditUsername } from '../models/IEditUsername';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor( private http: HttpClient) 
  { }

  // Decalre function to call api to get users from the server
  GetUsers ()
  {
    const url = `${Constants.api_url}/users`;
    return this.http.get<any>(url);
  }


  // to add article
  AddArticle(articleObj: IArticle)
  {
    const url = `${Constants.api_url}/Articles/addarticle`;
    console.log(url);
    return this.http.post<any>(url, articleObj);
    // const body = {
    //   Id: articleId,
    //   Body: articleBody
    // }
  }

  GetArticleById(articleId: number)
  {
    const url = `${Constants.api_url}/Articles/${articleId}`;
    
    //error
    //const url = `${Constants.api_url}/Articles?id=${articleId}`;

    return this.http.get<any>(url);
  }

  // ----------------------------------------------------------------

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
  
  
  
  // Get Contact/User Info
  get_user_info (user_id: number)
  {
    const url = `${Constants.api_url}/Users/get-user-info/${user_id}`;

    return this.http.get<IUserInfo>(url);
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

  delete_user(id: number)
  {
    const url = `${Constants.api_url}/Users/${id}`;

    return this.http.delete<any[]>(url);
  }

}
