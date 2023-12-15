import { Component } from '@angular/core';
import { ManagementService } from 'src/app/services/management.service';

// Define an interface to represent the data structure
interface IGrades {
  id: number;
  isVisible?: boolean;
  name?: string;
}


@Component({
  selector: 'app-ad-grades',
  templateUrl: './ad-grades.component.html',
  styleUrls: ['./ad-grades.component.css']
})

export class AdGradesComponent {

  Grades_List!: IGrades[];

  constructor(private api_service: ManagementService) {}

  ngOnInit()
  {
    this.Get_All_Grades();    

  }

  Get_All_Grades()
  {
    this.api_service.Get_all_grades().subscribe(
      {
        next: (res) => 
        {
          //console.log(res);
          this.Grades_List = res;
          //console.log(this.Grades_List);
        },
        error: (err) => 
        {
          console.log(err);
        }
      }
    );
  }


  onCheckboxChange(event: any, gradeId: number): void 
  {
    const isVisible = event.target.checked;
    console.log(isVisible); //test // if true or false

    // Call the service method to update the isVisible value
    this.api_service.updateGradeVisibility(gradeId, isVisible).subscribe(
      {
        next: () => {
          console.log('Visibility updated successfully.');
        },
        error: (err) => {
          console.error('Error updating visibility:', err);
        }
      }
    );
  }


}
