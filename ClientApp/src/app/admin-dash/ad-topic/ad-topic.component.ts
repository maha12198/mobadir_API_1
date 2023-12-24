import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import classicEditor from '@ckeditor/ckeditor5-build-classic'
import {MyUploadAdapter} from '../../models/my-upload-adapter'

import { StoreUserService } from 'src/app/services/store-user.service';

import { ActivatedRoute } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { IGrades } from 'src/app/models/IGrades';
import { ISubject } from 'src/app/models/ISubject';
import { INewTopic } from 'src/app/models/INewTopic';
import { IFile } from 'src/app/models/IFile';
import { NgToastService } from 'ng-angular-popup';
import { IQuestionModel } from 'src/app/models/IQuestionModel';

import { Router } from '@angular/router';


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
              private storeUserService : StoreUserService,
              private route: ActivatedRoute,
              private management_api_service: ManagementService,
              private toast: NgToastService,
              private router: Router)
  {}


  user_id: number | undefined;
  passed_grade_id!:number;
  passed_subject_id!:number;


  // the main form in this page
  editorForm!: FormGroup;

  answerToView!: string;

  selectedGrade!: string;
  Have_params: boolean = true; 

  
  // for displaying add/edit buttons
  edit: boolean = false;
  add: boolean = true;

  passed_topic_id!: number;

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
      if (Object.keys(params).length > 0) 
      {
        this.Have_params = true;
        console.log('this.Have_params =', this.Have_params);

        this.passed_grade_id = +params['gradeId'];
        this.passed_subject_id = +params['subjectId'];
        this.passed_topic_id = +params['topicId'];

        console.log("Passed_grade_Id = ",this.passed_grade_id); //test
        console.log("Passed_subject_Id = ",this.passed_subject_id); //test
        console.log("Passed_topic_Id = ",this.passed_topic_id); //test

        // intialize main form
        this.editorForm = this.fb.group(
          {
            selectedGrade: [{value: '' , disabled: false } ,[Validators.required]],
            selectedSubject: [{value: '', disabled: false } ,[Validators.required]],
            selectedTerm: [ 1 ,[Validators.required]],
            title: ['',[Validators.required] ],
            videoUrl: [''],
    
            body:['']
          }
        );


        // -------------- do the data ppoulation for the dropdownlists
        // get all grades to populate the grade dropdown
        this.Get_All_Grades();
        
        // get all grades to populate the subject dropdown with respect to the grade
        this.get_subjects_of_the_grade(this.passed_grade_id);
        
        // get the gradeName and subjectName from api by the subject id
        //  =>  to auto select gradename and subjectname and make the dropdown of grade and subject disbled
        this.GetDataToAddTopic(this.passed_subject_id);

      }
      else
      {
        console.log('Route does not have parameters.');

        this.Have_params = false; 
        console.log('this.Have_params =', this.Have_params);

        // intialize main form
        this.editorForm = this.fb.group(
          {
            selectedGrade: [{value: 1 , disabled: false } ,[Validators.required]],
            selectedSubject: [{value: 1, disabled: false } ,[Validators.required]],
            selectedTerm: [ 1 ,[Validators.required]],
            title: ['',[Validators.required] ],
            videoUrl: [''],
    
            body:['']
          }
        );
  
            // get the value selected in grade dropdownlist
            this.editorForm?.get('selectedGrade')?.valueChanges.subscribe((value) => 
            {
              console.log('Selected Grade Value:', value);
  
              this.selectedGrade = this.editorForm?.get('selectedGrade')?.value;
            });
      

        // get all grades to populate the grade dropdown
        this.Get_All_Grades();
        // onSelectGradeChange - call this function on the chnage of grade and the get_subjects_of_the_grade is called inside it 
        this.get_subjects_of_the_grade(1); // default value at first intialization only


      }
    });


          // test value selected in term dropdownlist
          // this.editorForm?.get('selectedTerm')?.valueChanges.subscribe((value) => 
          // {
          //   console.log('Selected Term Value:', value);
          // });



    // ---------------------- populate data of topic in editor form (EDIT) ---------------------
    // Access the route snapshot to get the current path
    const currentPath = this.route.snapshot.routeConfig?.path;
    //console.log(currentPath); // test

    // Check if the current path is 'admin-edit-topic'
    if (currentPath == 'admin-edit-topic/:gradeId/:subjectId/:topicId') 
    {
      console.log('Edit topic');
      this.edit = true;
      this.add = false;
      console.log('edit', this.edit, 'add', this.add);

      // call function to get topic id data and populate the form with the data
      this.GetDataOfTopicToEdit(this.passed_topic_id);
    }


   
 


    // intialize Files Form
    this.FilesForm = this.fb.group(
      {
        FileName: ['',[Validators.required] ],
        AttachFile: ['',[Validators.required] ] ,
      }
    );

    //Intialize File Links Form
    this.FileLinkForm = this.fb.group(
      {
        FileLinkName: ['',[Validators.required]],
        LinkUrl: ['',[Validators.required]]
      }
    );

    // Intialize Questions Form
    this.QuestionsForm = this.fb.group(
      {
        questionText: ['',[Validators.required]],

        choice1: ['',[Validators.required]],
        choice2: ['',[Validators.required]],
        choice3: ['',[Validators.required]],
        choice4: ['',[Validators.required]],

        answer: ['',[Validators.required]],

        attach_questions_image: ['']
      }
    );

    this.UpdateQuestionsForm = this.fb.group(
      {
        QuesText_update: ['',[Validators.required]],

        Choice1_update: ['',[Validators.required]],
        Choice2_update: ['',[Validators.required]],
        Choice3_update: ['',[Validators.required]],
        Choice4_update: ['',[Validators.required]],

        Answer_update: ['',[Validators.required]],

        attach_questions_image_update: ['']
      }
    );



  }



  // getter method for this control to do a validation
  get FileName() 
  {
    return this.FilesForm.get('FileName');
  }
  // getter method for this control to do a validation
  get AttachQuestionImage() 
  {
    return this.QuestionsForm.get('attach_questions_image');
  }
  // getter method for this control to do a validation
  get attach_questions_image_update() 
  {
    return this.UpdateQuestionsForm.get('attach_questions_image_update');
  }





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
          console.log(this.Grades_List);
        },
        error: (err) =>
        {
          console.log(err);
        }
      }
    );
  }

  // In Add new Topic form Sidebar, change subject list based on the grade selected
  onSelectGradeChange()
  {
    console.log('entered onSelectGrade function');

    if (this.Have_params == false)
    {
      console.log("call subject by grade selected:");
      this.get_subjects_of_the_grade(this.selectedGrade);
    }
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










  // --------------------------------------------- FILES part --------------------------------------------

  Files: IFile[] =[];
  FilesForm!: FormGroup;

  // 1- add file
  // Add new file in Files List
  addFileInMemory()
  {
    // Ensure that the "Upload" button was clicked before allowing form submission
    if (!this.uploadButtonClicked) 
    {
      alert('الرجاء رفع الملف أولا'); 
      return;
    }

    const newFile: IFile =
    {
      name: this.FilesForm?.get('FileName')?.value,
      fileUrl: this.File_Url
    };
    console.log("new file: ", newFile);

    this.Files.push(newFile);
    console.log("files list", this.Files);

    this.FilesForm.reset();

    $('#add-file-browse-modal').modal('hide');

    this.toast.success({ detail:"sucess", summary: "تمت إضافة الملف", duration: 2000, position:'topCenter'});
    
    
    // Reset the flag for subsequent form submissions
    this.uploadButtonClicked = false; // that ensure the user uploaded the file before submitting/adding the file
    this.OneTimeUploadbuttonClicked = false; // that ensure the user uploaded the file only once ( to prevent multiple upload of the same file)

    this.File_Url='';

  }


  // 2 -- Add Link
  FileLinkForm!: FormGroup;
  addFileLinkInMemory()
  {
    const newFile: IFile =
    {
      name: this.FileLinkForm?.get('FileLinkName')?.value,
      fileUrl: this.FileLinkForm?.get('LinkUrl')?.value
    };
    console.log("new file: ", newFile);

    this.Files.push(newFile);
    console.log("files list", this.Files);

    this.FileLinkForm.reset();

    $('#add-file-link-modal').modal('hide');

    this.toast.success({ detail:"sucess", summary: "تمت إضافة الرابط", duration: 2000, position:'topCenter'});
   
    this.File_Url='';
  }


  // Delete file from memory
  Pass_Selected_file!: IFile;
  SendFileToBeDeleted(file: IFile) // used to pass the file selected from the row of Files table  to the modal popup
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









  // ------------------------------------------ UPLOAD FILE
  uploadFile!: File | null;
  handleFileInput(files: FileList)
  {
    if (files.length > 0)
    {
      this.uploadFile = files.item(0);
    }
  }

  File_Url;
  uploadButtonClicked: boolean  = false;
  OneTimeUploadbuttonClicked: boolean = false; // to make the button clicked only one time
  new_upload()
  {
    console.log('entered upload function');

    // ensure the user seleceted a a file
    if (!this.uploadFile)
    {
      alert('الرجاء اختيار ملف اولا !');
      return;
    }

    if (!this.OneTimeUploadbuttonClicked) {
      // Perform your button click logic here
      console.log('Button clicked!');
      
      // Set the flag to true to disable the button
      this.OneTimeUploadbuttonClicked = true;
    }

    const formData = new FormData();
    formData.append(this.uploadFile.name, this.uploadFile);

    console.log("form data: ", this.uploadFile.name, this.uploadFile); //test

    this.toast.warning({ detail:"Info", summary: " الرجاء انتظار رسالة تأكيد رفع الملف الخاص بكم", sticky: true , position:'topCenter'});

    this.management_api_service.upload_new_file(formData).subscribe(
      { next: (res) => {
          console.log('File uploaded successfully:', res.url);
          
          this.File_Url = res.url;
          
          this.uploadButtonClicked = true; // Set the flag to true when the uplaod button is clicked
        },
        error: (err) => {
          console.error('File upload failed:',err);
        },
        complete: () => {
          console.log('Entred Complete');

          this.toast.success({ detail:"sucess", summary: "تم رفع الملف", duration: 2000, position:'topCenter'});
        }
      });
  }


  // ------------------------------------------ DOWNLOAD FILE
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







  
  // ------------------------------------------- QUESTIONS Part -----------------------------------------

  Questions: IQuestionModel[] =[];
  QuestionsForm!: FormGroup;

  // Add new Question in Questions List
  add_Question_InMemory()
  {

    // if the user attached a file and did not upload it 
    if ((this.AttachQuestionImage?.value) && (!this.uploadButtonClicked) )
    {
      alert('الرجاء رفع ملف الصورة أولا'); 
      return;
    }
    
    const newQuestion: IQuestionModel =
    {
      questionText: this.QuestionsForm?.get('questionText')?.value,
      choice1: this.QuestionsForm?.get('choice1')?.value,
      choice2: this.QuestionsForm?.get('choice2')?.value,
      choice3: this.QuestionsForm?.get('choice3')?.value,
      choice4: this.QuestionsForm?.get('choice4')?.value,
      answer: this.QuestionsForm?.get('answer')?.value,

      imageUrl: this.File_Url
    };
    console.log("new Question: ", newQuestion);

    this.Questions.push(newQuestion);
    console.log("Questions list Length = ", this.Questions.length);

    this.QuestionsForm.reset();

    $('#add-ques-modal').modal('hide');

    this.toast.success({ detail:"sucess", summary: "تمت إضافة السؤال", duration: 2000, position:'topCenter'});
    
    
    // Reset the flag for subsequent form submissions
    this.uploadButtonClicked = false; // that ensure the user uploaded the file before submitting/adding the file
    this.OneTimeUploadbuttonClicked = false; // that ensure the user uploaded the file only once ( to prevent multiple upload of the same file)
    
    this.File_Url='';

  }

  
  // Delete Questions from memory
  Pass_Selected_Question!: IQuestionModel;
  UpdateQuestionsForm!: FormGroup;
  SendQuestion_ToModal(question: IQuestionModel) // used to pass the file selected from the row of Files table  to the modal popup
  {
    this.Pass_Selected_Question = question;

    // Patch the form values with the selected question
    this.UpdateQuestionsForm.patchValue({
      QuesText_update: question.questionText,

      Choice1_update: question.choice1,
      Choice3_update: question.choice2,
      Choice2_update: question.choice3,
      Choice4_update: question.choice4,

      Answer_update: question.answer,

      //question_image_update: question.ImageUrl    //check this
    });

    //test
    console.log("1", this.Pass_Selected_Question); 

  }

  deleteQuestion_InMemory()
  {
    console.log("2", this.Pass_Selected_Question); //test

    const index = this.Questions.findIndex((f) => f === this.Pass_Selected_Question);

    if (index !== -1)
    {
      this.Questions.splice(index, 1);

      console.log('Question deleted successfully');

      $('#confirm-delete-ques-modal').modal('hide');
    }
  }


  getQuestionImageUrl(): any {
    // Assuming this.Pass_Selected_Question is the current question
    return this.Pass_Selected_Question ? this.Pass_Selected_Question.imageUrl : '';
  }
  Update_Question_InMemory()
  {
    // if the user attached a file and did not upload it 
    if ((this.AttachQuestionImage?.value) && (!this.uploadButtonClicked) )
    {
      alert('الرجاء رفع ملف الصورة أولا'); 
      return;
    }

    // Update the question properties with the form values
    const updatedQuestion: IQuestionModel =
    {
      questionText: this.UpdateQuestionsForm?.get('QuesText_update')?.value,
      choice1: this.UpdateQuestionsForm?.get('Choice1_update')?.value,
      choice2: this.UpdateQuestionsForm?.get('Choice2_update')?.value,
      choice3: this.UpdateQuestionsForm?.get('Choice3_update')?.value,
      choice4: this.UpdateQuestionsForm?.get('Choice4_update')?.value,
      answer: this.UpdateQuestionsForm?.get('Answer_update')?.value,

      imageUrl: this.File_Url
    };

    // Find the index of the selected question in the array
    const index = this.Questions.findIndex((f) => f === this.Pass_Selected_Question);

    if (index !== -1) {
      // Update the question in the array
      this.Questions[index] = updatedQuestion;

      // Close the modal
      $('#edit-ques-modal').modal('hide');
    }

    // Reset the form
    this.UpdateQuestionsForm.reset();

    this.toast.success({ detail:"sucess", summary: "تم تعديل السؤال", duration: 2000, position:'topCenter'});
    
    
    // Reset the flag for subsequent form submissions
    this.uploadButtonClicked = false; // that ensure the user uploaded the file before submitting/adding the file
    this.OneTimeUploadbuttonClicked = false; // that ensure the user uploaded the file only once ( to prevent multiple upload of the same file)
    
    this.File_Url='';

  }






  
  // ---------------- Add new Topic (Submit button) ------------------
  newTopic!: INewTopic;
  //topic_id!:number;
  new_content!: string;
  AddTopicMainData()
  {
    if (this.Have_params == true)
    {
      this.newTopic =
      {
        title: this.editorForm?.get('title')?.value,
        videoUrl: this.editorForm?.get('videoUrl')?.value,
        term: this.editorForm?.get('selectedTerm')?.value,
        subjectId: this.passed_subject_id ,
        createdBy: this.user_id,
      };
    }

    if (this.Have_params == false)
    {
      this.newTopic =
      {
        title: this.editorForm?.get('title')?.value,
        videoUrl: this.editorForm?.get('videoUrl')?.value,
        term: this.editorForm?.get('selectedTerm')?.value,
        subjectId: this.editorForm?.get('selectedSubject')?.value, // should get it 
        createdBy: this.user_id,
      };
    }
    
    console.log("newTopic = ", this.newTopic);

    this.new_content = this.editorForm?.get('body')?.value
    console.log("newContent = ", this.new_content);

    console.log("test files passed: ", this.Files);
    console.log("test questions passed: ", this.Questions)

    this.management_api_service.AddMainDataForTopic(this.newTopic, this.new_content, this.Files, this.Questions).subscribe(
     {
       next: (res) => {
          console.log("Topic Added!");
          this.toast.success({ detail:"sucess", summary: "تمت إضافة الدرس", duration: 3000, position:'topCenter'});
       },
       error: (err) => {
         console.error('Error in adding Topic Main Data:', err);
       }
     }
   );

  }







  // ----------------------------------------- Edit Topic ----------------------------------------

  Fetchedtopic;
  GetDataOfTopicToEdit(topic_id)
  {
    console.log('Entered GetDataOfTopicToEdit to get Edit Topic Data, Topic_id passed to the method = ', topic_id);

    this.management_api_service.GetDataToEditTopic(topic_id).subscribe(
      { next: (res) => {
          console.log('Data of Topic Fetched successfully:', res);
          
          this.Fetchedtopic = res;
          console.log('Topic fetched: ', this.Fetchedtopic);

          this.Files = res.files;
          this.Questions = res.questions;
          
          
          console.log('Patch Editor Form Values is here')
          // Patch the form values with the topic data
          this.editorForm.patchValue({
            selectedTerm: this.Fetchedtopic.term,
            title: this.Fetchedtopic.title,
            videoUrl: this.Fetchedtopic.videoUrl,
            
            body: this.Fetchedtopic.content.content,
          });
          
        },
        error: (err) => {
          console.error('Error in fetching topic data:',err);
        }
      });
  }





  //editTopic!: IEditTopic;
  //editTopic!: INewTopic;
  editTopic;
  editContent!: string;
  EditTopic()
  {
    console.log('Entered EditTopic function, Topic_id passed to the method = ', this.passed_topic_id);

    this.editTopic = this.Fetchedtopic;
    console.log('this.editTopic = ',this.editTopic);
    //console.log('this.fetchedTopic = ',this.Fetchedtopic);


    this.editTopic.title = this.editorForm?.get('title')?.value;
    this.editTopic.videoUrl = this.editorForm?.get('videoUrl')?.value;
    this.editTopic.term = this.editorForm?.get('selectedTerm')?.value;
    this.editTopic.content.content = this.editorForm?.get('body')?.value;
    this.editTopic.files = this.Files;
    this.editTopic.questions = this.Questions;

    console.log("editTopic = ", this.editTopic);

    this.management_api_service.EditTopic(this.passed_topic_id, this.editTopic).subscribe(
     {
       next: (res) => {
          console.log(res.message);
          console.log("Topic Edited!");
          this.toast.success({ detail:"sucess", summary: "تم تعديل الدرس", duration: 3000, position:'topCenter'});
       },
       error: (err) => {
         console.error('Error in editting Topic Main Data:', err);
       }
     }
   );
   

  }










  // confirm(): is the MAIN submit form function in this page
  confirm ()
  {
    console.log("confirm method entered!");

    if( this.editorForm.invalid)
    {
      console.log("invalid FORM DATA");
    
      this.toast.error({ detail:"Error", summary: "الرجاء ادخال بيانات الدرس", duration: 3000, position:'topCenter'});

      return;
    }


    if (this.add == true)
    {
      // -------- Add -------------
      this.AddTopicMainData();
  
      this.editorForm.reset();
  
      // navigate to the prev page
      if (this.Have_params == true)
      {
        this.router.navigate(['/admin-all-topics', this.passed_grade_id, this.passed_subject_id]);
      }
      else if(this.Have_params == false)
      {
        this.router.navigate(['/admin-dash', this.user_id]);
      }
  
    }
    else if ( this.edit == true )
    {
      // -------- Edit -------------
      
      this.EditTopic();
  
      this.editorForm.reset();
  
      // navigate to the prev page
      this.router.navigate(['/admin-all-topics', this.passed_grade_id, this.passed_subject_id], { skipLocationChange: true }); //fix this error
    
    }


  }

  
}
