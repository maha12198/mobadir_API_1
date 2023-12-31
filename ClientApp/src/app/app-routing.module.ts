import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// importing the components needed for the routes/navigation
import { HomeComponent } from './home/home.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HeaderComponent } from './header/header.component';
import { AllTopicsOfSubjectComponent } from './all-topics-of-subject/all-topics-of-subject.component';
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
  {path: 'all-grades', component : AllGradesComponent},
  {path: 'subjects/:gradeId' , component : SubjectsComponent},
  {path: 'all-topics-of-subject/:subjectId', component : AllTopicsOfSubjectComponent},
  // {path: 'all-topics-of-subject/:gradeId/:subjectId', component : AllTopicsOfSubjectComponent},
  {path: 'topic/:subjectId/:topicId', component : TopicComponent},
  {path: 'quiz/:subjectId/:topicId', component : QuizComponent},
  
      // {path : '**', component : HomeComponent}, //wildcard route // can be 404 error
      // {path: 'header', component : HeaderComponent},
      //{path: 'admin-test', component : AdminTestComponent},
  
  // can activate auth guard => so only logged in users can access this component(the dashboard)
  //   to test if it works => delete the token from local storage and try to access the component
  {path: 'admin-dash/:userId', component: AdminDashComponent, canActivate: [authGuard]},
  {path: 'admin-users', component :UsersComponent, canActivate: [authGuard]},
  {path: 'admin-edit-contact', component :EditContactComponent, canActivate: [authGuard]},
  
  {path: 'admin-grades', component :AdGradesComponent, canActivate: [authGuard]},
  {path: 'admin-subjects/:gradeId', component :AdSubjectsComponent, canActivate: [authGuard]},
  {path: 'admin-all-topics/:gradeId/:subjectId', component :AdAllTopicsComponent, canActivate: [authGuard]},
  
  {path: 'admin-add-topic/:gradeId/:subjectId', component :AdTopicComponent, canActivate: [authGuard]},
  {path: 'admin-add-topic', component :AdTopicComponent, canActivate: [authGuard]},
  {path: 'admin-edit-topic/:gradeId/:subjectId/:topicId', component :AdTopicComponent, canActivate: [authGuard]}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
