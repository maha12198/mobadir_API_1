import { Component } from '@angular/core';

import classicEditor from '@ckeditor/ckeditor5-build-classic'
import { IArticle } from '../models/IArticle';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {

  // -------------- variables -------------------

  private _value: string = '';

  public Editor = classicEditor;

  public articleBody :string = '';

  viewArticle: IArticle | any ={} ;
  
  public viewerReadonly = true;

  
  public viewerConfig = {
    toolbar: [ ],
    language: {
      ui: 'ar',
      content: 'ar'
    },
  };

  public articleData = '<p>عزيزي الطالب يسعدنا أن نقدم لكم مجموعة من الأسئلة المتنوعة على الوحدة الثانية مادة الرياضيات المتقدمة متبوعة باختبار الكتروني عبر شبكة مبادر التعليمية تم تجميع هذه الأسئلة من اختبارات كامبريدج وترجمتها وصياغتها بشكل مبسط عزيزي الطالب يسعدنا أن نقدم لكم مجموعة من الأسئلة المتنوعة على الوحدة الثانية مادة الرياضيات المتقدمة متبوعة باختبار الكتروني عبر شبكة مبادر التعليمية تم تجميع هذه الأسئلة من اختبارات كامبريدج وترجمتها وصياغتها بشكل مبسط</p><figure class=\"image\"><img style=\"aspect-ratio:1920/1080;\" src=\"http://ahamdycs2012-001-site1.btempurl.com/uploads//9400f799-5d6f-4484-9c28-f4bd37890584topicImageExp1.jpeg\" width=\"1920\" height=\"1080\"></figure><p>&nbsp;</p><p>&nbsp;</p><p>عزيزي الطالب يسعدنا أن نقدم لكم مجموعة من الأسئلة المتنوعة على الوحدة الثانية مادة الرياضيات المتقدمة متبوعة باختبار الكتروني عبر شبكة مبادر التعليمية تم تجميع هذه الأسئلة من اختبارات كامبريدج وترجمتها وصياغتها بشكل مبسط عزيزي الطالب يسعدنا أن نقدم لكم مجموعة من الأسئلة المتنوعة على الوحدة الثانية مادة الرياضيات المتقدمة متبوعة باختبار الكتروني عبر شبكة مبادر التعليمية تم تجميع هذه الأسئلة من اختبارات كامبريدج وترجمتها وصياغتها بشكل مبسط</p><p>&nbsp;</p><p>عزيزي الطالب يسعدنا أن نقدم لكم مجموعة من الأسئلة المتنوعة على الوحدة الثانية مادة الرياضيات المتقدمة متبوعة باختبار الكتروني عبر شبكة مبادر التعليمية تم تجميع هذه الأسئلة من اختبارات كامبريدج وترجمتها وصياغتها بشكل مبسط عزيزي الطالب يسعدنا أن نقدم لكم مجموعة من الأسئلة المتنوعة على الوحدة الثانية مادة الرياضيات المتقدمة متبوعة باختبار الكتروني عبر شبكة مبادر التعليمية تم تجميع هذه الأسئلة من اختبارات كامبريدج وترجمتها وصياغتها بشكل مبسط</p>';



  // --------------- functions ----------------
  
  ViewArticleById() 
  {
    const idTest: number = 13;

    this.viewArticle = "";

    // this.service.GetArticleById(idTest).subscribe({
    //   next: (res) => {  console.log('test ViewArticleById')
    //                     console.log(res);
    //                     this.viewArticle = res;
    //                     console.log(this.viewArticle); 
    //                   },
    //   error: (err) => { console.log(err);}
    // });

  }

  constructor() {}

  ngOnInit(): void {
    

    this.ViewArticleById();
  }
  




}
