import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Constants } from '../config/constants';
import { Observable } from 'rxjs';
import { ISubject } from '../models/ISubject';
import { INewTopic } from '../models/INewTopic';
import { IFile } from '../models/IFile';
import { IQuestionModel } from '../models/IQuestionModel';



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

  
  
  // ------------------------ Add Topic Page ------------------------
  // get data needed to add topic from inside the all topics page ( grade and subject should be known and selected )
  GetDataToAddTopic(subject_id: number)
  {
    const url = `${Constants.api_url}/Topics1/GetAddTopicData/${subject_id}`;

    return this.http.get<any>(url);
  }

  
  

  AddMainDataForTopic(newTopic: INewTopic, newContent: string, files: IFile[], questions: IQuestionModel[])
  {
    let input = 
    {
      //  attention: case sensitive to what is delcared in the api side
      new_topic: newTopic,
      new_content: newContent,
      passed_files: files,
      passed_questions: questions
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



  // ------------------ Edit Topic Page -----------------------
  GetDataToEditTopic(topic_id: number)
  {
    const url = `${Constants.api_url}/Topics1/Get_EditTopic_Data/${topic_id}`;

    return this.http.get<any>(url);
  }


  EditTopic(topic_id: number, topic_data)
  {
    const url = `${Constants.api_url}/Topics1/${topic_id}`;

    return this.http.put<any>(url, topic_data);
  }






  // --------------------------- Contact Information of the website ------------------------
  getContactInfo() 
  {
    const url = `${Constants.api_url}/Users/GetContactInfo`;
    return this.http.get<any>(url);
  }

  setPhoneNo(phoneNo: number)
  {   
    const url = `${Constants.api_url}/Users/phone/${phoneNo}`;
    return this.http.put<any>(url, {});
  }

  setEmail(email: string)
  {
    const url = `${Constants.api_url}/Users/email/${email}`;
    return this.http.put<any>(url, {});
  }
 




}
