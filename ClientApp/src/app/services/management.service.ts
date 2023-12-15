import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor( private http: HttpClient) 
  { }

  // get all grades
  Get_all_grades ()
  {
    const url = `${Constants.api_url}/Grades`;

    return this.http.get<any>(url);
  }

  // update grade visibility
  updateGradeVisibility(gradeId: number, isVisible: boolean): Observable<any>
  {
    const url = `${Constants.api_url}/Grades/${gradeId}`;

    return this.http.patch(url, { isVisible }); //{}syntax is an example of object shorthand notation in TypeScript
    // It's a concise way to create an object literal with a property named isVisible whose value is taken from the variable or constant with the same name.
  }
  
}
