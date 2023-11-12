import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// importing the components needed for the routes/navigation
import { HomeComponent } from './home/home.component';
import { GradeComponent } from './grade/grade.component';
import { HeaderComponent } from './header/header.component';
import { SubjectComponent } from './subject/subject.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  {path : '' , component : HomeComponent}, // Redirect route // to Dashboard Page as it is the main page
  // {path : '**', component : HomeComponent}, //wildcard route
  {path : 'grade-page' , component : GradeComponent},
  {path: 'header', component : HeaderComponent},
  {path: 'subject', component : SubjectComponent},
  {path: 'topic', component : TopicComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
