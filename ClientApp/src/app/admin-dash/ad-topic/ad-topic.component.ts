import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import classicEditor from '@ckeditor/ckeditor5-build-classic'
import {MyUploadAdapter} from '../../models/my-upload-adapter'

import { IArticle } from '../../models/IArticle';
import { ApiService } from '../../services/api.service';

import { StoreUserService } from 'src/app/services/store-user.service';

import { ActivatedRoute } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { IGrades } from 'src/app/models/IGrades';
import { ISubject } from 'src/app/models/ISubject';
import { INewTopic } from 'src/app/models/INewTopic';


interface ITopicDataToAdd
{
  gradeName?: string;
  subjectName?: string;
}

@Component({
  selector: 'app-ad-topic',
  templateUrl: './ad-topic.component.html',
  styleUrls: ['./ad-topic.component.css']
})
export class AdTopicComponent {

  constructor(private fb: FormBuilder,
              private service: ApiService,
              private storeUserService : StoreUserService,
              private route: ActivatedRoute,
              private management_api_service: ManagementService)
  {}


  user_id: number | undefined;
  passed_grade_id!:number;
  passed_subject_id!:number;

  // the main form in this page
  editorForm!: FormGroup;
  
  ngOnInit()
  {
    
    // Subscribe to the userId$ observable to get the user id 
    this.storeUserService.userId$.subscribe((userId) => 
    {
      if (userId !== null) {
        this.user_id = userId;
        console.log("Passed user id = ", this.user_id);
      }
    });


    // get the subjectId and gradeId from route parameters (from grade page)
    this.route.params.subscribe((params) => 
    {
      this.passed_grade_id = +params['gradeId'];
      this.passed_subject_id = +params['subjectId'];
      
      console.log("Passed_grade_Id = ",this.passed_grade_id); //test
      console.log("Passed_subject_Id = ",this.passed_subject_id); //test
    });


    // get all grades to populate the grade dropdown
    this.Get_All_Grades();

    // get all grades to populate the subject dropdown with respect to the grade
    this.get_subjects_of_the_grade(this.passed_grade_id);

    // get the gradeName and subjectName from api by the subject id
    //  =>  to auto select gradename and subjectname and make the dropdown of grade and subject disbled
    this.GetDataToAddTopic(this.passed_subject_id);
    


    // intialize form
    this.editorForm = this.fb.group(
      {
        selectedGrade: [{value: '' , disabled: false } ,[Validators.required]],
        selectedSubject: [{value: '', disabled: false } ,[Validators.required]],
        selectedTerm: [ 1 ,[Validators.required]],
        title: ['',[Validators.required] ],
        videoUrl: ['',[Validators.required] ],
       
        body:[''],

      }
    );

    // test data value selected in term dropdownlist
    this.editorForm?.get('selectedTerm')?.valueChanges.subscribe((value) => {
      console.log('Selected Term Value:', value);
    });


  }




  // for displaying add/edit buttons
  edit: boolean = false;
  add: boolean = true;


  // -------------------------- CKeditor -----------------------
  //some variables needed forfor CKeditor
  private _value: string = '';
  public Editor = classicEditor;
  public editorConfig = {
    toolbar: 
    { 
      items: [
        'undo', 'redo', '|',
        'heading', '|',
        'bold', 'italic', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', 'numberedList', '|',
        'insertTable', '|',
        'imageUpload', 'blockQuote'
      ],
    shouldNotGroupWhenFull: true
  },
    //new for rtl support
    language: {
      ui: 'ar',
      content: 'ar'
    }
  };
  //some functions used for CK Editor
  get value() 
  {
    return this._value;
  }
  set value(v: string) 
  {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  onChange(_) { }
  onTouch() { }
  writeValue(obj: any): void 
  {
    this._value = obj;
  }
  registerOnChange(fn: any): void 
  {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void 
  {
    this.onTouch = fn;
  }
  onReady(editor) 
  {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => 
    {
      return new MyUploadAdapter( loader );
    };
  }
  // -------------------------- CKeditor -----------------------






  // -------------------------------- FUNCTIONS --------------------------------
  Grades_List!: IGrades[];
  Get_All_Grades()
  {
    this.management_api_service.Get_all_grades().subscribe(
      {
        next: (res) => 
        {
          //console.log(res);
          this.Grades_List = res;
          //console.log(this.Grades_List);
        },
        error: (err) => 
        {
          console.log(err);
        }
      }
    );
  }

  Subject_List!: ISubject[];
  get_subjects_of_the_grade(grade_Id)
  {
    this.management_api_service.Get_subjects_by_gradeId(grade_Id).subscribe(
      {
        next: (res)=> {
          //console.log(res);
          this.Subject_List = res;
          console.log(this.Subject_List);
        },
        error: (err)=> {
          console.log(err);
        } 
      }
    );
  }
  
  topicDataToAdd!: ITopicDataToAdd;
  GetDataToAddTopic(passed_subject_id)
  {
    // get subject and grade name and make them selected and cannot be changed
    this.management_api_service.GetDataToAddTopic(passed_subject_id).subscribe(
     {
       next: (res) => {
          // test
          this.topicDataToAdd = res;
          console.log(this.topicDataToAdd.gradeName);
          console.log(this.topicDataToAdd.subjectName);
 
          //select the gradename value on the dropdownlist
          this.editorForm?.get('selectedGrade')?.disable();
          this.editorForm?.get('selectedGrade')?.setValue(this.topicDataToAdd.gradeName, {onlySelf: true});
          
          //select the subjectname value on the dropdownlist
          this.editorForm?.get('selectedSubject')?.disable();
          this.editorForm?.get('selectedSubject')?.setValue(this.topicDataToAdd.subjectName, {onlySelf: true});
       },
       error: (err) => {
         console.error('Error getting data of Grade and Subject Names:', err);
       }
     }
   );
  }

  newTopic!: INewTopic;
  AddTopicMainData()
  {
    this.newTopic = 
    {
      title: this.editorForm?.get('title')?.value,
      videoUrl: this.editorForm?.get('videoUrl')?.value,
      term: this.editorForm?.get('selectedTerm')?.value,
      subjectId: this.passed_subject_id ,
      createdBy: this.user_id
    };
    console.log("newTopic = ", this.newTopic);
    

    this.management_api_service.AddMainDataForTopic(this.newTopic).subscribe(
     {
       next: (res) => {
          console.log(res.message);
       },
       error: (err) => {
         console.error('Error in adding Topic Main Data:', err);
       }
     }
   );
  }





  

  // confirm(): is the submit form function (previously made for the ckeditor)
  public articleBody :string = '';   //Try this: public articleBody  = this.editorForm?.get('body')?.value;
  newArticle: IArticle | undefined;
  confirm()
  {
    if( this.editorForm.invalid)
    {
      console.log("invalid FORM DATA");
      return;
    }


    //                        call adding functions one by one
    // 1- add topic (Basic Main Data) => Term - title - VideoUrl - SubjectId - CreatedBy - isVisible - CreatedAt 
    this.AddTopicMainData();
    
    // 2- add content (Body- CKEditor) => another table (topicContent)

    // 3- add Files (Many) => another table (File)

    // 1- add Questions (Many) => another table (Question)



    // Access the selected term value
    //const selectedTermValue = this.editorForm?.get('selectedTerm')?.value;
    // Do something with the selected term value
    //console.log('Selected Term Value:', selectedTermValue);
    
    
    //////////////////// add body/content //////////////////
    //console.log(this.articleBody); //test
    
    // this.newArticle = {
    //   Body : this.editorForm?.get('body')?.value
    // };
    
    // adding article to the DB
    // this.service.AddArticle(this.newArticle).subscribe({
    //   next: (res)  => { console.log('article created successfully:')
    //                   },
    //   error: (err) => { console.error('Error creating article:', err)}
    // });

  }
}
