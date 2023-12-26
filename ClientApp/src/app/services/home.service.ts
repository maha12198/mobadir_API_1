import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';


@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor( private http: HttpClient) 
  { }

  Get_ContactUs_Info()
  {
    const url = `${Constants.api_url}/Home/GetContactInfo`;
    return this.http.get<any>(url);
  }


  Get_all_grades()
  {
    const url = `${Constants.api_url}/Home/Get_all_grades`;
    return this.http.get<any>(url);
  }



}
