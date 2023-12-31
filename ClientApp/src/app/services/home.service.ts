import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { Observable } from 'rxjs';


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

  // get only the visible grades 
  Get_all_grades()
  {
    const url = `${Constants.api_url}/Home/Get_all_grades`;
    return this.http.get<any>(url);
  }

  // get only the visible subjects of the grade 
  Get_all_subjects_of_Grade(grade_id: number)
  {
    const url = `${Constants.api_url}/Home/get-subjects-by-grade/${grade_id}`;
    return this.http.get<any>(url);
  }

  // get only the visible topics of the grade 
  Get_all_topics_of_subject(subject_id: number)
  {
    const url = `${Constants.api_url}/Home/GetAllTopics/${subject_id}`;
    return this.http.get<any>(url);
  }

  // get subject name and grade name by subject id
  GetTopicData(subject_id: number)
  {
    const url = `${Constants.api_url}/Home/GetSubjectGradeName/${subject_id}`;
    return this.http.get<any>(url);
  }

  // get topic bt id
  GetTopic(topic_id: number)
  {
    const url = `${Constants.api_url}/Home/GetTopic/${topic_id}`;
    return this.http.get<any>(url);
  }

  download_new_File(fileUrl: string): Observable<Blob> 
  {
    return this.http.get(fileUrl, { responseType: 'blob' });
  }
  
}
