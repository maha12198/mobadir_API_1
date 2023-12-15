import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-subjects',
  templateUrl: './ad-subjects.component.html',
  styleUrls: ['./ad-subjects.component.css']
})
export class AdSubjectsComponent {

  Passed_grade_Id!: number; //get it from route parameters and then use it to retrieve data(subjects) of that grade id

  constructor(private route : ActivatedRoute)
  {}


  ngOnInit()
  {
    this.route.params.subscribe((params) => 
    {
      
      // Access the grade id parameter from the route (from grades page to here)
      this.Passed_grade_Id = +params['gradeId']; // Convert to number + (get the passed grade id from the route params)
      
      console.log("Passed_grade_Id = ",this.Passed_grade_Id); //test
    });
  }

  

}
