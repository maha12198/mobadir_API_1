import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { IArticle } from '../models/IArticle';

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
              // POST: api/Articles/addarticle
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

    
}
