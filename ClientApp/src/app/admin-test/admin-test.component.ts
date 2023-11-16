import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-admin-test',
  templateUrl: './admin-test.component.html',
  styleUrls: ['./admin-test.component.css']
})
export class AdminTestComponent {
  public Editor = ClassicEditor;
  
  public config = {
    toolbar: [ 
        'heading', '|',
        'fontfamily','fontsize',
        'alignment',
        'fontColor','fontBackgroundColor', '|',
        'bold', 'italic', 'underline', 'custombutton', 'strikethrough', 'subscript', 'superscript','|',
        'link','|',
        'outdent','indent','|',
        'bulletedList','numberedList','|',
        'code','codeBlock','|',
        'insertTable','|',
        'imageUpload','blockQuote','|',
        'undo','redo','|',
        'youtube',
        'mediaEmbed'
      ],
    simpleUpload: {
      uploadUrl: 'https://localhost:44395/api/image'
    },
  };
}
