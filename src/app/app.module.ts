import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './dashboard/user/user.component';
import { CourseComponent } from './pages/course/course.component';
import { HttpClientModule } from '@angular/common/http';
import { SpecializedTrainingComponent } from './pages/specialized-training/specialized-training.component';
import { LecturersComponent } from './lecturers/lecturers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UserComponent,
    CourseComponent,
    SpecializedTrainingComponent,
    LecturersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
