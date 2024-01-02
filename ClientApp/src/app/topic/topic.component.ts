import { Component } from '@angular/core';

import classicEditor from '@ckeditor/ckeditor5-build-classic'
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//import { ManagementService } from '../services/management.service';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {


  constructor(private route: ActivatedRoute,
              private home_service_api: HomeService,
              private sanitizer: DomSanitizer
              //private api : ManagementService
              )
  {}


  passed_subject_Id;
  passed_topic_Id;
  subjectName;
  gradeName;
  topic_data;
  title;
  video_url!: SafeResourceUrl;

  // content (CKEditor Configuration)
  public Editor = classicEditor;
  public viewerReadonly = true;
  public viewerConfig = {
    toolbar: [ ],
    language: {
      ui: 'ar',
      content: 'ar'
    },
  };
  public articleData;

  files;

  ngOnInit()
  {

    //             get the gradeId parameter from the route
    this.route.params.subscribe((params) =>
    {
      this.passed_subject_Id = +params['subjectId'];
      this.passed_topic_Id = +params['topicId'];

      console.log("Passed_subject_Id = ",this.passed_subject_Id); //test
      console.log("Passed_topic_Id = ",this.passed_topic_Id); //test
    });


    // Subscribe to fragment changes ( this is for "scroll to id " in html - to be able to use it in nagular with route params")
    this.route.fragment.subscribe(fragment =>
      {
        if (fragment)
        {
          // Scroll to the element with the corresponding ID
          const element = document.getElementById(fragment);

          if (element)
          {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    );


    //            get the grade name and subject name
    this.home_service_api.GetTopicData(this.passed_subject_Id).subscribe(
      {
        next: (res) =>
        {
          console.log(res);
          this.subjectName = res.subjectName;
          this.gradeName = res.gradeName;
        },
        error: (err) =>
        {
          console.log('error in getting the grade and subject names', err);
        }
      }
    );


    //            get all topic data by topic id
    this.home_service_api.GetTopic(this.passed_topic_Id).subscribe(
      {
        next: (res) =>
        {
          console.log(res);
          this.topic_data = res;


          if (this.topic_data !=null)
          {
            this.title = this.topic_data.title;

            if ( this.topic_data.videoUrl != null)
            {
              const videoId = this.extractVideoId(this.topic_data.videoUrl);
              const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
              this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
            }

            if ( this.topic_data.content != null )
            {
              this.articleData = this.topic_data.content.content;
            }

            this.files = this.topic_data.files;
            console.log(this.files);
          }
        },
        error: (err) =>
        {
          console.log('error in fetching topic data from server' , err);
        }
      }
      );

  }




  extractVideoId(url: string): string | null
  {
    // Regular expression to match YouTube video IDs
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    // If a match is found, return the video ID, otherwise return null
    return match ? match[1] : null;
  }


  download_file(file_url, file_name, file_extension)
  {
    // new: for file type and file link option
    if (file_extension == null)
    {
      // Open the file URL in a new tab
      const link = document.createElement('a');
      link.href = file_url;
      link.target = '_blank'; // Open in a new tab
      link.click();
    }
    else 
    {
      this.home_service_api.download_new_File(file_url).subscribe({
        next: (data) =>
        {
          const contentType = data.type || `application/${file_extension}` || 'application/octet-stream';
          const blob = new Blob([data], { type: contentType });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = file_name;
          link.click();
        },
        error: (error) => {
          console.error('File download failed:', error);
        }
      });
    }
    

  }

}
