import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  isQuizToBeStarted: boolean = false;
  onStart() {
    this.isQuizToBeStarted = !this.isQuizToBeStarted;
  }

}
