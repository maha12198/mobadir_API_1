import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/IQuestion';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {

  // got the passed item form parent component ( quiz component )
  @Input() item;

  constructor( private toast: NgToastService)
  {}

  questions;
  question;
  i: number = 0;
  totalQuestions;

  ngOnInit() {
    console.log('questions component is here!');
    //console.log('item: ',this.item); // check the passed item from parent component

    // store the passed item from quiz component ( which is the questions got from API) in questions array
    this.questions = this.item;
    console.log('questions: ', this.questions); // check the questions array

    // get the first question from the questions intially
    this.question = this.questions[this.i];
    console.log('question = ', this.question);

    // get the number of questions
    this.totalQuestions = this.questions.length;
    console.log('totalQuestions = ', this.totalQuestions);

    // Shuffle options for all questions when the component initializes
    this.questions.forEach(question => this.shuffleOptions(question));
   
    
  }

  answer: any;
  onSelecting(value: any) 
  {
    console.log(value);
    this.answer = value;
  }

  onPrev() 
  {
    --this.i;

    this.question = this.questions[this.i];
  }

  score: any = 0;
  answeredQuestions: { question: IQuestion, userAnswer: string, isCorrect: boolean }[] = [];   //to track user answers and display them at the end of the quiz
  onNext() 
  {
    //validation
    if (this.answer == null || this.answer == undefined) 
    {
      console.log("null answer selected");

      this.toast.error({ detail:"خطــأ", summary: "مـن فضــلك اختـر إجابـة الســؤال أولاً", duration: 2500, position:'topCenter'});
        
      return;
    }

    // Track answers (to display them at the last step to the user)
    const currentQuestion = this.questions[this.i];

    // Check if the question is already in answeredQuestions
    const existingIndex = this.answeredQuestions.findIndex(
      (answeredQuestion) => answeredQuestion.question.question === currentQuestion.question
    );
    //console.log('prev ques:',this.answeredQuestions[existingIndex])

    if (existingIndex !== -1)
    {
      // check if the stored prev same question was correct and the score was ++, we need to -- before proceeding to next step
      if (currentQuestion.answer == this.answeredQuestions[existingIndex].userAnswer)
      {
        this.score--;
        console.log('score --')
      }
      // Update the existing entry if the question is already answered
      this.answeredQuestions[existingIndex] = 
      {
        question: { ...currentQuestion }, // Update the question
        userAnswer: this.answer,
        isCorrect: this.answer === currentQuestion.answer // Update isCorrect based on the new answer
      };
    }
    else
    {
      // Add the question to answeredQuestions if it's not already answered
      this.answeredQuestions.push(
      {
        question: { ...currentQuestion }, // Create a copy of the question
        userAnswer: this.answer,
        isCorrect:  this.answer === currentQuestion.answer
      });
    }
        
    // Update the score after tracking the answer
    if (this.answer === currentQuestion.answer)
    {
      ++this.score;
    }
    
    console.log("Score : ", this.score);
    console.log("Answer : ", this.answer);
    
    //get the next question
    ++this.i;
    this.question = this.questions[this.i];
    
    //console.log(this.i);
    console.log("Question : ", this.question);

    //clear checks on the answer options
    const radioButtons = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    radioButtons.forEach((radio: HTMLInputElement) => {
      radio.checked = false;
    }); 

    this.answer = null;
  }




  // when button triggered إعادة الاختـبـــار
  refreshQuiz()
  {
    window.location.reload();
  }



  // Function to shuffle an array ( the options array)
  shuffleArray(array: any[]): any[] 
  {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  // Function that call the function above to shuffle options array for a given question
  shuffleOptions(question: any)
  {
    // call the shuffle function and store the new shuffled options array in question.options(same place/in place of)
    question.options = this.shuffleArray(question.options);
  }



}
