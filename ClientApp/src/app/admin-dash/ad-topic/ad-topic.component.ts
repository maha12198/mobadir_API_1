import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import classicEditor from '@ckeditor/ckeditor5-build-classic'
import {MyUploadAdapter} from '../../models/my-upload-adapter'

import { IArticle } from '../../models/IArticle';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ad-topic',
  templateUrl: './ad-topic.component.html',
  styleUrls: ['./ad-topic.component.css']
})
export class AdTopicComponent {

  // for displaying add/edit buttons
  edit: boolean = true;
  add: boolean = false;

  // -------------- variables -------------------

  private _value: string = '';

  public Editor = classicEditor;

  editorForm!: FormGroup;

  public articleBody :string = '';

  newArticle: IArticle | undefined;

  //viewArticle: IArticle | any ={} ;
  
  //public viewerReadonly = true;

  public editorConfig = {
    toolbar: [
        'heading', '|',
        'fontfamily', 'fontsize',
        'alignment',
        'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', '-', 'numberedList', 'todoList', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'imageUpload', 'blockQuote', '|',
        'todoList',
        'undo', 'redo',
        'MathType'
      ],
    shouldNotGroupWhenFull: true,

    //new for rtl support
    language: {
      ui: 'ar',
      content: 'ar'
    }
  };
  
  // public viewerConfig = {
  //   toolbar: [ ],
  //   language: {
  //     ui: 'ar',
  //     content: 'ar'
  //   }
  // };




  
  // --------------- functions ----------------

  get value() {
    return this._value;
  }

  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(private fb: FormBuilder,
              private service: ApiService) {}


  onChange(_) {
  }

  onTouch() { }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  onReady(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => 
    {
      return new MyUploadAdapter( loader );
    };
  }

  confirm()
  {
    console.log(this.articleBody);

    if( this.editorForm.invalid)
    {
      return;
    }
    
    this.newArticle = {
      Body : this.editorForm?.get('body')?.value
    };
    
    // adding article to the DB
    this.service.AddArticle(this.newArticle).subscribe({
      next: (res)  => { console.log('article created successfully:')
                      },
      error: (err) => { console.error('Error creating article:', err)}
    })
  }


  // ViewArticleById() 
  // {
  //   const idTest: number = 13;
  //   this.service.GetArticleById(idTest).subscribe({
  //     next: (res) => {  console.log('test ViewArticleById')
  //                       console.log(res);
  //                       this.viewArticle = res;
  //                       console.log(this.viewArticle); 
  //                     },
  //     error: (err) => { console.log(err);}
  //   });
  // }

  ngOnInit(): void {
    // intialize login form
    this.editorForm = this.fb.group({
      body:['',[Validators.required]]
    });

    //this.ViewArticleById();
  }
  



}
