import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';

// import { NgZone } from '@angular/core';

@Component({
  selector: 'app-all-topics-of-subject',
  templateUrl: './all-topics-of-subject.component.html',
  styleUrls: ['./all-topics-of-subject.component.css']
})
export class AllTopicsOfSubjectComponent {

  
  constructor(private route: ActivatedRoute,
              private home_service_api: HomeService,
              //private zone: NgZone
              )
  {}


  // passed_grade_Id;
  passed_subject_Id;
  topics_list;
  subjectName;
  gradeName;
  ngOnInit()
  {

    //             get the gradeId parameter from the route
    this.route.params.subscribe((params) => 
    {
      // this.passed_grade_Id = +params['gradeId']; 
      this.passed_subject_Id = +params['subjectId']; 
      
      // console.log("Passed_grade_Id = ",this.passed_grade_Id); //test
      console.log("Passed_subject_Id = ",this.passed_subject_Id); //test
    });


    //             get the visible subjects of the grade
    this.home_service_api.Get_all_topics_of_subject(this.passed_subject_Id).subscribe(
    {
      next: (res) => 
      {
        console.log(res);
        this.topics_list = res;
      },
      error: (err) =>
      {
        console.log(err);
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
          console.log(err);
        }
      }
    );

  }

  //                   Filtering the topics by term
  selectedFilter: string = 'all';
  get filteredTopics(): any[] 
  {
    if (this.selectedFilter === 'all')
    {
      return this.topics_list;
    }
    else
    {
      return this.topics_list.filter(topic => topic.term === this.selectedFilter);
    }
  }
  setFilter(term: string)
  {
    this.selectedFilter = term;

    //test
    console.log(this.selectedFilter);
  }




}
