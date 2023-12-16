import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// importing the components needed for the routes/navigation
import { HomeComponent } from './home/home.component';
import { GradeComponent } from './grade/grade.component';
import { HeaderComponent } from './header/header.component';
import { SubjectComponent } from './subject/subject.component';
import { TopicComponent } from './topic/topic.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdminTestComponent } from './admin-test/admin-test.component';
import { AllGradesComponent } from './all-grades/all-grades.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdTopicComponent } from './admin-dash/ad-topic/ad-topic.component';
import { AdAllTopicsComponent } from './admin-dash/ad-all-topics/ad-all-topics.component';
import { AdGradesComponent } from './admin-dash/ad-grades/ad-grades.component';
import { AdSubjectsComponent } from './admin-dash/ad-subjects/ad-subjects.component';
import { UsersComponent } from './admin-dash/users/users.component';
import { EditContactComponent } from './admin-dash/edit-contact/edit-contact.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '' , component : HomeComponent}, // Redirect route // to Dashboard Page as it is the main page
  // {path : '**', component : HomeComponent}, //wildcard route // can be 404 error
  {path: 'grade-page' , component : GradeComponent},
  {path: 'header', component : HeaderComponent},
  {path: 'subject', component : SubjectComponent},
  {path: 'topic', component : TopicComponent},
  {path: 'quiz', component : QuizComponent},
  {path: 'admin-test', component : AdminTestComponent},
  {path: 'all-grades', component : AllGradesComponent},
  
  // can activate auth guard => so only logged in users can access this component(the dashboard)
  //   to test if it works => delete the token from local storage and try to access the component
  {path: 'admin-dash/:userId', component: AdminDashComponent, canActivate: [authGuard]},
  {path: 'admin-users', component :UsersComponent, canActivate: [authGuard]},
  {path: 'admin-edit-contact', component :EditContactComponent, canActivate: [authGuard]},
  
  {path: 'admin-grades', component :AdGradesComponent, canActivate: [authGuard]},
  {path: 'admin-subjects/:gradeId', component :AdSubjectsComponent, canActivate: [authGuard]},
  {path: 'admin-all-topics', component :AdAllTopicsComponent, canActivate: [authGuard]},
  {path: 'admin-topic', component :AdTopicComponent, canActivate: [authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
