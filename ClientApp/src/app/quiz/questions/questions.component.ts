import { Component } from '@angular/core';

//
import questions from "../../models/questions.json";



@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {

  //get question data from the json file
  questions: any = questions;

  //counter
  i: number = 0;
  
  // get the first question from the questions intially
  question: any = this.questions[this.i];

  //get number of questions
  totalQuestions = questions.length;

  // declare variables for the answer and score 
  answer: any;
  score: any = 0;

makeFalse: boolean = false;

 //FOR TESTING ONLY
  ngOnInit() {
    console.log(this.questions[0]);
    console.log(this.question);
  }


  onSelecting(value: any) {
    console.log(value);
    
    this.answer = value;
  }


  onPrev() {
    --this.i;

    this.question = this.questions[this.i];
  }

  onNext() {

    //validation
    if (this.answer == null || this.answer == undefined) 
    {
      console.log("null answer selected");
      return;
    }


    // check if the answer is correct
    if (this.answer === this.question.answer)
    {
      ++this.score;
    }

    console.log("Score : ", this.score);
    //console.log(this.questions);
    console.log("Answer : ", this.answer);
    
    //get the next question
    ++this.i;
    this.question = this.questions[this.i];
    
    console.log(this.i);
    console.log("Question : ", this.question);

    //clear checks on the answer options
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

    radioButtons.forEach((radio: HTMLInputElement) => {
      radio.checked = false;
    });
  }

}