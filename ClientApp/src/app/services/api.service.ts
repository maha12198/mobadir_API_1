import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

    // Decalre function to call api to get users from the server
    GetUsers ()
    {
      const url = `${Constants.api_url}/users`;
      return this.http.get<any>(url);
    }
  
}
