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
import { IFile } from 'src/app/models/IFile';
import { NgToastService } from 'ng-angular-popup';


declare var $: any; // Declare jQuery to avoid TypeScript errors


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
              private management_api_service: ManagementService,
              private toast: NgToastService)
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
       
        body:['',[Validators.required]],

      }
    );

    // test data value selected in term dropdownlist
    this.editorForm?.get('selectedTerm')?.valueChanges.subscribe((value) => {
      console.log('Selected Term Value:', value);
    });


    // intialize Files form
    this.FilesForm = this.fb.group(
      {
        FileName: ['',[Validators.required] ],
        AttachFile: ['',[Validators.required] ] ,
      }
    );


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
  topic_id!:number;
  new_content!: string; 
  AddTopicMainData()
  {
    this.newTopic = 
    {
      title: this.editorForm?.get('title')?.value,
      videoUrl: this.editorForm?.get('videoUrl')?.value,
      term: this.editorForm?.get('selectedTerm')?.value,
      subjectId: this.passed_subject_id ,
      createdBy: this.user_id,
    };
    console.log("newTopic = ", this.newTopic);
    
    this.new_content = this.editorForm?.get('body')?.value
    console.log("newContent = ", this.new_content);

    console.log("test files passed: ", this.Files);

    this.management_api_service.AddMainDataForTopic(this.newTopic, this.new_content, this.Files).subscribe(
     {
       next: (res) => {
        
          console.log("Topic Added!");
       },
       error: (err) => {
         console.error('Error in adding Topic Main Data:', err);
       }
     }
   );
  }


  // new_content!: string; 
  // AddTopicContent(topic_id: number)
  // {
  //   this.new_content = this.editorForm?.get('body')?.value;
  //   console.log(this.new_content); // test
    
  //   this.management_api_service.AddContentForTopic( topic_id, this.new_content).subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res.message);
  //         console.log("Topic Content Added!");
  //       },
  //       error: (err) => {
  //         console.error('Error in adding Content of Topic:', err);
  //       }
  //     }
  //   );
  // }


  Files: IFile[] =[];
  FilesForm!: FormGroup;

  // Add new file in Files List
  addFileInMemory()
  {
    //console.log("test id: ",this.topic_id);
    const newFile: IFile = 
    {
      name: this.FilesForm?.get('FileName')?.value,
      fileUrl: this.FilesForm?.get('AttachFile')?.value ,
      // topicId: this.topic_id
    };
    //log("new file: ", newFile);
    this.Files.push(newFile);
    console.log("files list", this.Files);
    this.FilesForm.reset();
    $('#add-file-browse-modal').modal('hide');
    this.toast.success({ detail:"sucess", summary: "تمت إضافة الملف", duration: 2000, position:'topCenter'});
  }

  // Delete file from memory
  Pass_Selected_file!: IFile;
  SendFileToBeDeleted(file: IFile) // used to pass the file from the row to the modal
  {
    this.Pass_Selected_file = file;
    console.log("1", this.Pass_Selected_file); //test
  }
  deleteFileInMemory()
  {
    console.log("2", this.Pass_Selected_file); //test

    const index = this.Files.findIndex((f) => f === this.Pass_Selected_file);

    if (index !== -1) 
    {
      this.Files.splice(index, 1);

      console.log('File deleted successfully');

      $('#confirm-delete-modal').modal('hide');
    }
  }



  // add files to the db/api
  // addMultipleFiles(topic_id: number, FilesToPass: IFile[]) 
  // {
  //   this.management_api_service.AddFiles(topic_id, FilesToPass).subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res.message);
  //         console.log("Files Added to api!");
  //       },
  //       error: (err) => {
  //         console.error('Error in adding Files to api:', err);
  //       }
  //     }
  //   );
  // }











  

  // confirm(): is the MAIN submit form function in this page
  confirm ()
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
    // called it inside the prev function to ensure that the function is called after the one before

    // 3- add Files (Many) => another table (File)


    // 4- add Questions (Many) => another table (Question)



  }
}
