import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Constants } from '../config/constants';
import { Observable, catchError, throwError } from 'rxjs';
import { ISubject } from '../models/ISubject';
import { INewTopic } from '../models/INewTopic';
import { IFile } from '../models/IFile';


@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor( private http: HttpClient) 
  { }

  // ------------------------ Grades Page ------------------------
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



  // ------------------------ Subjects Page ------------------------
  // get all subjects of the selected grade (by gradeId)
  Get_subjects_by_gradeId (grade_id: number)
  {
    const url = `${Constants.api_url}/Subjects/get-subjects-by-grade/${grade_id}`;

    return this.http.get<any>(url);
  }

  // update grade visibility
  UpdateSubjectVisibility(subjectId: number, isVisible: boolean): Observable<any>
  {
    const url = `${Constants.api_url}/Subjects/${subjectId}`;

    return this.http.patch(url, { isVisible }); 
  }

  // add new subject
  Add_subject( subjectObj : ISubject)
  {
    const url = `${Constants.api_url}/Subjects`;

    return this.http.post<any>(url, subjectObj); 
  }


  // ------------------------ All Topics Page ------------------------

  // get all topics of the subject
  Get_topics_by_subject(subject_id: number)
  {
    const url = `${Constants.api_url}/Topics1/GetAllTopics/${subject_id}`;

    return this.http.get<any>(url);
  }

  
  // update grade visibility
  UpdateTopicVisibility(topicId: number, isVisible: boolean): Observable<any>
  {
    const url = `${Constants.api_url}/Topics1/${topicId}`;

    return this.http.patch(url, { isVisible }); 
  }

  
  
  // ------------------------ All Topics Page ------------------------
  // get data needed to add topic from inside the all topics page ( grade and subject should be known and selected )
  GetDataToAddTopic(subject_id: number)
  {
    const url = `${Constants.api_url}/Topics1/GetAddTopicData/${subject_id}`;

    return this.http.get<any>(url);
  }

  
  

  AddMainDataForTopic(newTopic: INewTopic, newContent: string, files: IFile[])
  {
    let input = 
    {
      //  attention: case sensitive to what is delcared in the api side
      new_topic: newTopic,
      new_content: newContent,
      passed_files: files
    }
  
    const url = `${Constants.api_url}/Topics1/AddTopic`;

    return this.http.post<any>(url, input).pipe();
  }





  UploadFile(formData)
  {
    const url = `${Constants.api_url}/Upload`;

    return this.http.post<any>(url, formData,  { reportProgress: true});
  }


  downloadFile(file: string|undefined): Observable<HttpEvent<Blob>> 
  {
    return this.http.request(new HttpRequest(
      'GET',
      `${Constants.api_url}/Upload/download?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }




  upload_new_file(formData)
  { 
    const url = `${Constants.api_url}/RichEditor/ImageUpload_1`;

    return this.http.post<any>(url, formData);

  }

    
  download_new_File(fileUrl: string): Observable<Blob> 
  {
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

}
