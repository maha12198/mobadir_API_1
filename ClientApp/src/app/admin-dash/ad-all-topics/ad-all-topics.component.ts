import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITopic } from 'src/app/models/ITopic';
import { ManagementService } from 'src/app/services/management.service';
import { SearchPipe } from '../../pipes/search.pipe';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-ad-all-topics',
  templateUrl: './ad-all-topics.component.html',
  styleUrls: ['./ad-all-topics.component.css'],
  // new for search pipe
  providers: [SearchPipe]
})
export class AdAllTopicsComponent {

  constructor(private route: ActivatedRoute,
              private api_service: ManagementService)
  {}

  passed_grade_id!: number;
  passed_subject_id!: number;

  ngOnInit()
  {
    // get the subjectId and gradeId from route parameters (from grade page)
    this.route.params.subscribe((params) => 
    {
      this.passed_grade_id = +params['gradeId']; 
      this.passed_subject_id = +params['subjectId'];
      
      console.log("Passed_grade_Id = ",this.passed_grade_id); //test
      console.log("Passed_subject_Id = ",this.passed_subject_id); //test
    });

    // call function to populate the topics table
    this.GetTopicsBySubject(this.passed_subject_id);

  }




  TopicsList1!: ITopic[];
  // get all topics of the passed/selected subject
  GetTopicsBySubject(subject_id)
  {
    this.api_service.Get_topics_by_subject(subject_id).subscribe(
      {
        next: (res)=> {
          //console.log(res);
          this.TopicsList1 = res;
          console.log(this.TopicsList1);

          // new : to update the term text in the table as one text to enable it to be found ny search filter pipe in the table
          if (this.TopicsList1.length > 0) 
          {
            // Update the isVisible property for all objects in TopicsList1
            this.TopicsList1.forEach(topic => {
              const termText = "الفصل الدراسي ";
              topic.term = termText + topic.term;
            });
          }
        
        },
        error: (err)=> {
          
          // if (this.TopicsList1.length == 0 || this.TopicsList1.length < 0)
          // {
          //   console.log("No Topics were found for this subject!");
          // }

          console.log("Error in Fetching Topics: ",err);
        }
      }
    );
  }

  
  // change Visibility of the topic
  onCheckboxChange(event: any, topicId: number): void 
  {
    const isVisible = event.target.checked;
    console.log(isVisible); //test // if true or false

    // Call the service method to update the isVisible value
    this.api_service.UpdateTopicVisibility(topicId, isVisible).subscribe(
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


  // Search Functionality
  searchText!: string;

  clearSearch() 
  {
    this.searchText = '';
  }


  //---- to get the id of the selected topic in the table
  // Variable to store the topic ID for deleting
  Pass_Selected_TopicId!: number;
  // Method to set the current user ID before showing the modal
  setEditUserId(topicId: number) {
    this.Pass_Selected_TopicId = topicId;
    console.log('Pass_Selected_TopicId = ', this.Pass_Selected_TopicId);
  }
  delete_topic()
  {
    this.api_service.Delete_topic(this.Pass_Selected_TopicId).subscribe(
      { next: (res)=> { 
          console.log(res);

          this.GetTopicsBySubject(this.passed_subject_id);

          $('#confirm-delete-modal').modal('hide');
        },
        error: (err)=>{ 
          console.log('Error in deleting the topic:', err);
        }
      }
    ); 
  }

}
