import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import classicEditor from '@ckeditor/ckeditor5-build-classic'
import { MyUploadAdapter } from '../../models/my-upload-adapter'
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
            videoUrl: [null],
    
            body:[null]
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
            videoUrl: [null],
    
            body:[null]
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

    // ------------------------------ Form Intialization ----------------------------
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

    // Intialize Update Questions Form
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



  // -------------------- getter methods for some controls to do a validation -------------------------------
  get FileName() 
  {
    return this.FilesForm.get('FileName');
  }
  get AttachQuestionImage() 
  {
    return this.QuestionsForm.get('attach_questions_image');
  }
  get attach_questions_image_update() 
  {
    return this.UpdateQuestionsForm.get('attach_questions_image_update');
  }





  // -------------------------- CKeditor -----------------------
  //some variables needed for CKeditor
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
    //for rtl support
    language: {
      ui: 'ar',
      content: 'ar'
    }
  };
  // functions used for CK Editor
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


  // ------------------ get all subjects of the selected grade (dropdownlist of subject)
  // **In Add new Topic from Sidebar, change subject list based on the grade selected
  onSelectGradeChange()
  {
    console.log('entered onSelectGrade function');

    if (this.Have_params == false)
    {
      console.log("call subject by grade selected:");
      this.get_subjects_of_the_grade(this.selectedGrade);
    }
  }

  // ------------------ get all subjects of the selected grade (dropdownlist of subject)
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

  // ------------------ get grade and subject of selected subject (dropdownlists of grade and subject)
  // **In Add new Topic inside a subject, autoselect grade an subject dropdownlists
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
      fileUrl: this.File_Url,
      fileExtension: this.File_Extension // new
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
    this.File_Extension=''; //new
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



  
  
  // ---------------------------------------------------- QUESTIONS Part ------------------------------------------------

  Questions: IQuestionModel[] =[];
  QuestionsForm!: FormGroup;

  //---------------------- Add new Question in Questions List -----------------
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

  
  //-----------------------  Delete Question from memory------------------------
  Pass_Selected_Question!: IQuestionModel;
  UpdateQuestionsForm!: FormGroup;

  // a function used to pass the file selected from the row of Files table  to the modal popup
  SendQuestion_ToModal(question: IQuestionModel)
  {
    this.Pass_Selected_Question = question;

    // Patch the form values with the selected question
    this.UpdateQuestionsForm.patchValue(
      {
        QuesText_update: question.questionText,
        Choice1_update: question.choice1,
        Choice3_update: question.choice2,
        Choice2_update: question.choice3,
        Choice4_update: question.choice4,
        Answer_update: question.answer
      });

    console.log(this.Pass_Selected_Question); 
  }

  // delete the selected question
  deleteQuestion_InMemory()
  {
    console.log(this.Pass_Selected_Question); //test

    const index = this.Questions.findIndex((f) => f === this.Pass_Selected_Question);

    if (index !== -1)
    {
      this.Questions.splice(index, 1);
      console.log('Question deleted successfully');
      $('#confirm-delete-ques-modal').modal('hide');
    }
  }

  // get the image url of the question to populate it in src property of img tag ( to display the img)
  getQuestionImageUrl(): any {
    // "Pass_Selected_Question" is the current question
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

    if (index !== -1)
    {
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







  // --------------------------------------------- UPLOADING PART (FILE/Question Image) ----------------------------------
  uploadFile!: File | null;
  handleFileInput(files: FileList)
  {
    if (files.length > 0)
    {
      this.uploadFile = files.item(0);
      console.log('Upload file:', this.uploadFile);
    }
  }

  File_Url;
  File_Extension; //new
  uploadButtonClicked: boolean  = false;
  OneTimeUploadbuttonClicked: boolean = false; // to make the button clicked only one time
  // ---------------------------  Upload new File ---------------------------
  upload_new_file()
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
          this.File_Extension = res.extension; // new: for file type
          
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

  // ---------------------------  Upload new Question Image ---------------------------
  upload_new_Question_Image()
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

    this.toast.warning({ detail:"Info", summary: " الرجاء انتظار رسالة تأكيد رفع الصورة", sticky: true , position:'topCenter'});

    this.management_api_service.upload_new_question_image(formData).subscribe(
      { next: (res) => {
          console.log('Question of the Image uploaded successfully:', res.url);
          
          this.File_Url = res.url;
          
          this.uploadButtonClicked = true; // Set the flag to true when the uplaod button is clicked
        },
        error: (err) => {
          console.error('Question of the Image upload failed:',err);
        },
        complete: () => {
          console.log('Entred Complete');

          this.toast.success({ detail:"sucess", summary: "تم رفع الملف", duration: 2000, position:'topCenter'});
        }
      });
  }













  
  // ---------------------------------------------- Add Topic ---------------------------------------------------
  newTopic!: INewTopic;
  new_content!: string | null;
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

    // Check if bodyValue is null or contains only spaces
    const bodyValue = this.editorForm?.get('body')?.value;
    if (bodyValue === null || /^\s*$/.test(bodyValue))
    {
      console.log("Body is null or contains only spaces");
      this.new_content = null;
      console.log("newContent = ", this.new_content);
    }
    else // it has a value
    {
      this.new_content = bodyValue;
      console.log("newContent = ", this.new_content);
    }

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







  // ------------------------------------------------- Edit Topic ------------------------------------------

  // get data of the selected topic
  Fetchedtopic;
  GetDataOfTopicToEdit(topic_id)
  {
    console.log('Entered GetDataOfTopicToEdit to get Edit Topic Data, Topic_id passed to the method = ', topic_id);

    this.management_api_service.GetDataToEditTopic(topic_id).subscribe(
      { next: (res) => {
          console.log('Data of Topic Fetched successfully:', res);
          
          this.Fetchedtopic = res;
          console.log('Fetchedtopic: ', this.Fetchedtopic);

          this.Files = res.files;
          this.Questions = res.questions;
          
          console.log('Patch Editor Form Values is here');

          // Patch the form values with the topic data
          this.editorForm.patchValue({
            selectedTerm: this.Fetchedtopic.term,
            title: this.Fetchedtopic.title
          });

          if (this.Fetchedtopic.videoUrl !== null)
          {
            this.editorForm.patchValue({
              videoUrl: this.Fetchedtopic.videoUrl
            });
          }

          if (this.Fetchedtopic.content && this.Fetchedtopic.content.content !== null)
          {
            this.editorForm.patchValue({
              body: this.Fetchedtopic.content.content,
            });
          }
        },
        error: (err) => {
          console.error('Error in fetching topic data:',err);
        }
      });
  }


  // edit selected topic
  editTopic!: INewTopic;
  editContent!: string | null;
  EditTopic()
  {
    console.log('Entered EditTopic function, Topic_id passed to the method = ', this.passed_topic_id);

    this.editTopic = this.Fetchedtopic.Topic;
    console.log('this.editTopic = ',this.editTopic);
    
    this.editTopic =
    {
      title: this.editorForm?.get('title')?.value,
      term: this.editorForm?.get('selectedTerm')?.value
    };
    console.log('1- editTopic = ',this.editTopic);

    // Check if videoUrl is null or contains only spaces
    const video = this.editorForm?.get('videoUrl')?.value;
    if (video === null || /^\s*$/.test(video))
    {
      console.log("videoUrl is null or contains only spaces");
      this.editTopic.videoUrl = null;
    }
    else // it has a value, then do normal
    {
      this.editTopic.videoUrl = this.editorForm?.get('videoUrl')?.value;
    }
    console.log('2- editTopic = ',this.editTopic);

    // Check if content is null or contains only spaces
    const bodyValue = this.editorForm?.get('body')?.value;
    if (bodyValue === null || /^\s*$/.test(bodyValue))
    {
      console.log("Body is null or contains only spaces");
      this.editContent = null;
    }
    else // it has a value, then do normal
    {
      this.editContent = this.editorForm?.get('body')?.value;
    }
    console.log('3- editContent = ',this.editContent);

    this.management_api_service.EditTopic(this.passed_topic_id, this.editTopic, this.editContent, this.Files, this.Questions).subscribe(
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





  // -------------------------------------- MAIN submit form function in this page ----------------------------------------
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
      this.router.navigate(['/admin-all-topics', this.passed_grade_id, this.passed_subject_id]);
    }
  }

  
}
