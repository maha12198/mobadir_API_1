import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {


  constructor(private route: ActivatedRoute,
              private home_service_api: HomeService)
  {}


  passed_grade_Id;
  subjects_list;
  no_Subject: boolean = false;
  ngOnInit()
  {

    //             get the gradeId parameter form the route
    this.route.params.subscribe((params) => 
    {
      this.passed_grade_Id = +params['gradeId']; 
      console.log("Passed_grade_Id = ",this.passed_grade_Id); //test
    });


    
    //             get the visible subjects of the grade
    this.home_service_api.Get_all_subjects_of_Grade(this.passed_grade_Id).subscribe(
      {
        next: (res) => 
        {
          console.log(res);
          this.subjects_list = res;
         
          // show no subjects to the user
          if ( this.subjects_list.length == 0 )
          {
            this.no_Subject = true;
          }
        },
        error: (err) =>
        {
          console.log(err);
        }
      }
    );



  }


  //             Define a mapping for grade title
  gradeTitles: { [key: number]: string } = {
    1: 'الأول',
    2: 'الثاني',
    3: 'الثالث',
    4: 'الرابع',
    5: 'الخامس',
    6: 'السادس',
    7: 'السابع',
    8: 'الثامن',
    9: 'التاسع',
    10: 'العاشر',
    11: 'الحادي عشر',
    12: 'الثاني عشر'
  };
  get currentGradeTitle(): string 
  {
    // Use the mapping to get the title based on the current grade ID
    return this.gradeTitles[this.passed_grade_Id] || '';
  }


}
