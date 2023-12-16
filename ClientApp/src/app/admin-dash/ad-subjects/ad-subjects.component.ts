import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubject } from 'src/app/models/ISubject';
import { ManagementService } from 'src/app/services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-ad-subjects',
  templateUrl: './ad-subjects.component.html',
  styleUrls: ['./ad-subjects.component.css']
})
export class AdSubjectsComponent {

  Passed_grade_Id!: number; //get it from route parameters and then use it to retrieve data(subjects) of that grade id

  Subject_List!: ISubject[];

  // Define a mapping for grade titles
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
    return this.gradeTitles[this.Passed_grade_Id] || '';
  }

  Passed_isVisible!: boolean;
  
  constructor(private route : ActivatedRoute,
              private api_service: ManagementService,
              private fb: FormBuilder,
              private toast: NgToastService)
  {}


  ngOnInit()
  {
    // get the grade id from route parameters (from grade page)
    this.route.params.subscribe((params) => 
    {
      this.Passed_grade_Id = +params['gradeId']; // Convert to number + (get the passed grade id from the route params)
      
      console.log("Passed_grade_Id = ",this.Passed_grade_Id); //test
    });

    // call the function to retrieve data in the table
    this.get_subjects_of_the_grade(this.Passed_grade_Id);

    //intialize add subject form
    this.Add_Subject_Form = this.fb.group(
      {
        name: ['', Validators.required],
        is_Visible : ['true', Validators.required]
      }
    );

    // At this point, the form has been initialized
    this.Passed_isVisible = this.Add_Subject_Form?.get('is_Visible')?.value;

    // Subscribe to value changes of the is_Visible control
    this.Add_Subject_Form?.get('is_Visible')?.valueChanges.subscribe((value) => {
      this.Passed_isVisible = value;
    });

    console.log("vis value", this.Passed_isVisible);
    
  }

  get_subjects_of_the_grade(grade_Id: number)
  {
    this.api_service.Get_subjects_by_gradeId(grade_Id).subscribe(
      {
        next: (res)=> {
          //console.log(res);
          this.Subject_List = res;
          //console.log(this.Subject_List);
        },
        error: (err)=> {
          console.log(err);
        }
      }
    );
  }


  
  onCheckboxChange(event: any, subjectId: number): void 
  {
    const isVisible = event.target.checked;
    console.log(isVisible); //test // if true or false

    // Call the service method to update the isVisible value
    this.api_service.UpdateSubjectVisibility(subjectId, isVisible).subscribe(
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

  Add_Subject_Form!: FormGroup;
  newSubject;

  Add_new_subject()
  {
    // Subscribe to value changes of the is_Visible control
    // this.Add_Subject_Form?.get('is_Visible')?.valueChanges.subscribe((value) => {
    //   if(value = 'undefined')
    //   {
    //     this.Passed_isVisible = true;
    //   }
    //   this.Passed_isVisible = value;
    // });

    this.newSubject = {
      name: this.Add_Subject_Form?.get('name')?.value,
      isVisible: this.Passed_isVisible,
      gradeId: this.Passed_grade_Id
    };

    console.log(this.newSubject); //test

    this.api_service.Add_subject(this.newSubject).subscribe(
      {
        next: (res)=> {
          console.log(res.message);
          this.toast.success({ detail:"sucess", summary: "تمت إضافة المادة", duration: 2000, position:'topCenter'});
          this.get_subjects_of_the_grade(this.Passed_grade_Id);
          $('#add-subject-modal').modal('hide');
        },
        error: (err)=> {
          console.log(err);
        }
      }
    );
  }


}
