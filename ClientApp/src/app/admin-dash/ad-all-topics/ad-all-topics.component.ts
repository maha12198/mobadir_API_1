import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITopic } from 'src/app/models/ITopic';
//import { StoreUserService } from 'src/app/services/store-user.service';
import { ManagementService } from 'src/app/services/management.service';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-ad-all-topics',
  templateUrl: './ad-all-topics.component.html',
  styleUrls: ['./ad-all-topics.component.css'],
  // new for search pipe
  providers: [SearchPipe]
})
export class AdAllTopicsComponent {

  constructor(private route: ActivatedRoute,
              //private storeUserService : StoreUserService
              private api_service: ManagementService)
  {}

  passed_subject_id!: number;  
  //user_id: number | null | undefined;

  ngOnInit()
  {
    // get the subject id from route parameters (from grade page)
    this.route.params.subscribe((params) => 
    {
      this.passed_subject_id = +params['subjectId']; // Convert to number + (get the passed subject id from the route params)
      
      console.log("Passed_subject_Id = ",this.passed_subject_id); //test
    });


    // Subscribe to the userId$ observable to get the user id 
    // this.storeUserService.userId$.subscribe((userId) => {
    //   this.user_id = userId;
    //   console.log("Passed user id = ", this.user_id);
    // });

    this.GetTopicsBySubject(this.passed_subject_id);
  }

  TopicsList1!: ITopic[];
  termText: string = "الفصل الدراسي ";

  GetTopicsBySubject(subject_id : number)
  {
    this.api_service.Get_topics_by_subject(subject_id).subscribe(
      {
        next: (res)=> {
          //console.log(res);
          this.TopicsList1 = res;
          //console.log(this.TopicsList1);
          // new to update the term text in the table as one text to enable it to be found ny search filter pipe in the table
          if (this.TopicsList1.length > 0) 
          {
            // Update the isVisible property for all objects in TopicsList1
            this.TopicsList1.forEach(topic => {
              topic.term = this.termText + topic.term;
            });
            // Print the updated array
            //console.log(this.TopicsList1); //done
          }
        },
        error: (err)=> {
          console.log(err);
        }
      }
    );
  }

  searchText!: string;

  clearSearch() 
  {
    this.searchText = '';
  }

}
