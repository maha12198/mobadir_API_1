import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import classicEditor from '@ckeditor/ckeditor5-build-classic'
import {MyUploadAdapter} from '../../models/my-upload-adapter'

import { ApiService } from '../../services/api.service';

import { StoreUserService } from 'src/app/services/store-user.service';

import { ActivatedRoute } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { IGrades } from 'src/app/models/IGrades';
import { ISubject } from 'src/app/models/ISubject';
import { INewTopic } from 'src/app/models/INewTopic';
import { IFile } from 'src/app/models/IFile';
import { NgToastService } from 'ng-angular-popup';

import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { saveAs } from 'file-saver';
import { Constants } from 'src/app/config/constants';

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
              private toast: NgToastService,
              private sanitizer: DomSanitizer,
              private http: HttpClient)
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

  // ---------------- Add new Topic (Submit button) ------------------
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






  // upload()
  // {
  //   console.log('entered upload function');

  //   if (!this.uploadFile)
  //   {
  //     alert('Choose a file to upload first');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append(this.uploadFile.name, this.uploadFile);

  //   this.management_api_service.UploadFile(formData).subscribe(
  //     { next: (event) => {
  //         console.log(event);
  //         console.log(event.url);
  //         console.log(event.message);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       }
  //     });
  // }

  // fileName!: string | undefined;
  // public download() {
  //   this.fileName = this.uploadFile?.name;

  //   this.management_api_service.downloadFile(this.fileName).subscribe({
  //     next : (data) =>  {
  //       switch (data.type) {
  //         case HttpEventType.DownloadProgress:
  //           console.log('DownloadProg');
  //           // this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
  //           break;
  //         case HttpEventType.Response:
  //           console.log('Response');
  //           if ((data.body !== null) && (data.type !== null))
  //           {
  //             //const contentType = data.headers.get('content-type');
  //             const downloadedFile = new Blob([data.body], { type: data.body.type  });


  //             console.log(downloadedFile);

  //             saveAs(data, this.fileName);
  //           }
  //           else
  //           {
  //             console.error('Error: Response body is null.');
  //             // Handle the error appropriately
  //           }
  //           break;
  //       }
  //     },
  //     error:
  //     (error) => {
  //       console.log(error);
  //     }
  //     });
  // }



  uploadFile!: File | null;

  handleFileInput(files: FileList)
  {
    if (files.length > 0)
    {
      this.uploadFile = files.item(0);
    }
  }


  File_Url;
  working = false;
  uploadProgress?: number;
  new_upload()
  {
    console.log('entered upload function');

    if (!this.uploadFile)
    {
      alert('Choose a file to upload first');
      return;
    }

    const formData = new FormData();
    formData.append(this.uploadFile.name, this.uploadFile);

    console.log("form data: ", this.uploadFile.name, this.uploadFile); //test

    this.uploadProgress = 0;
    this.working = true;

    this.management_api_service.upload_new_file(formData).subscribe(
      { next: (res) => {
          // console.log('File uploaded successfully:', res.url);
          // this.File_Url = res.url;
          if (res.type === HttpEventType.UploadProgress) 
          {
            console.log(res.loaded + '/' + res.total);
            this.uploadProgress = Math.round((100 * res.loaded) / res.total);
          } 
          else if (res.type === HttpEventType.Response) 
          {
            console.log('File uploaded successfully:', res.body.url);
          }
        },
        error: (err) => {
          console.error('File upload failed:',err);
        },
        complete: () => {
          this.working = false;
        }
      });
  }




  new_download()
  {
    console.log('entered download function');

    console.log('test printing the fileURL: ', this.File_Url);

    this.management_api_service.download_new_File(this.File_Url).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        //link.download = 'filename.extension'; // Set a default filename or extract it from the response headers
        if ( this.uploadFile != null)
        {
          link.download = this.uploadFile.name;
        }
        else
        {
          console.log('Upload file is null');
        }
        link.click();
      },
      error: (error) => {
        console.error('File download failed:', error);
      }
  });
  }





  // confirm(): is the MAIN submit form function in this page
  confirm ()
  {
    if( this.editorForm.invalid)
    {
      console.log("invalid FORM DATA");
      return;
    }

    this.AddTopicMainData();


  }
}
