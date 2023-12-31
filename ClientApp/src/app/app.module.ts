import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LoginFormComponent } from './login-form/login-form.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AllTopicsOfSubjectComponent } from './all-topics-of-subject/all-topics-of-subject.component';
import { TopicComponent } from './topic/topic.component';
import { QuizComponent } from './quiz/quiz.component';
import { TimerComponent } from './quiz/timer/timer.component';
import { QuestionsComponent } from './quiz/questions/questions.component';
import { AdminTestComponent } from './admin-test/admin-test.component';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AllGradesComponent } from './all-grades/all-grades.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdTopicComponent } from './admin-dash/ad-topic/ad-topic.component';
import { AdHeaderComponent } from './admin-dash/ad-header/ad-header.component';
import { AdSidebarComponent } from './admin-dash/ad-sidebar/ad-sidebar.component';
import { AdFooterComponent } from './admin-dash/ad-footer/ad-footer.component';
import { AdGradesComponent } from './admin-dash/ad-grades/ad-grades.component';
import { AdSubjectsComponent } from './admin-dash/ad-subjects/ad-subjects.component';
import { AdAllTopicsComponent } from './admin-dash/ad-all-topics/ad-all-topics.component';
import { UsersComponent } from './admin-dash/users/users.component';
import { EditContactComponent } from './admin-dash/edit-contact/edit-contact.component';

import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    SubjectsComponent,
    HeaderComponent,
    FooterComponent,
    AllTopicsOfSubjectComponent,
    TopicComponent,
    QuizComponent,
    TimerComponent,
    QuestionsComponent,
    AdminTestComponent,
    AllGradesComponent,
    AdminDashComponent,
    AdTopicComponent,
    AdHeaderComponent,
    AdSidebarComponent,
    AdFooterComponent,
    AdGradesComponent,
    AdSubjectsComponent,
    AdAllTopicsComponent,
    UsersComponent,
    EditContactComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgToastModule
  ],
  
  // define interceptor for authorization here 
  //-- this will modify the request header to make it include the authorization header, so authorized users can access, and unauthorized users cannot access the api
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
