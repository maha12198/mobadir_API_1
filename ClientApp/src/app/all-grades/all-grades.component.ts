import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';


@Component({
  selector: 'app-all-grades',
  templateUrl: './all-grades.component.html',
  styleUrls: ['./all-grades.component.css']
})

export class AllGradesComponent {

  constructor ( private home_service_api: HomeService)
  {}

  grades_list;
  ngOnInit()
  {
    this.home_service_api.Get_all_grades().subscribe(
      {
        next: (res) => 
        {
          console.log(res);
          this.grades_list = res;
        },
        error: (err) =>
        {
          console.log(err);
        }
      }
    );
  }

}
