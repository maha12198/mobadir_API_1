import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  isQuizToBeStarted: boolean = false;
  
  onStart() {
    this.isQuizToBeStarted = !this.isQuizToBeStarted;
  }

  constructor(private route: ActivatedRoute,
              private home_service_api: HomeService)
  {}

  passed_subject_Id;
  passed_topic_Id;

  subjectName;
  gradeName;
  topic_title;

  questions;

  ngOnInit()
  {

    //             get the gradeId parameter from the route
    this.route.params.subscribe((params) =>
    {
      this.passed_subject_Id = +params['subjectId'];
      this.passed_topic_Id = +params['topicId'];

      console.log("Passed_subject_Id = ",this.passed_subject_Id);
      console.log("Passed_topic_Id = ",this.passed_topic_Id);
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

    //            get the title of the topic
    this.home_service_api.Get_Title_of_Topic(this.passed_topic_Id).subscribe(
      {
        next: (res) =>
        {
          console.log(res);
          this.topic_title = res.title;
        },
        error: (err) =>
        {
          console.log('error in getting the title of the topic', err);
        }
      }
    );


    //            get questions of the topic
    this.home_service_api.Get_Questions(this.passed_topic_Id).subscribe(
      {
        next: (res) =>
        {
          console.log('res = ', res);
          this.questions = res;
          console.log('questions from api: ', this.questions);
        },
        error: (err) =>
        {
          console.log('error in getting questions of the topic', err);
        }
      }
    );



    }

}
