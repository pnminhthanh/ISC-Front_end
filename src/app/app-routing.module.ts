import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { CourseComponent } from './pages/course/course.component';
import { SpecializedTrainingComponent } from './pages/specialized-training/specialized-training.component';
import { from } from 'rxjs';
import { LecturerComponent } from './pages/lecturer/lecturer.component';
import { UniversitymajorComponent } from './pages/universitymajor/universitymajor.component';
import { StudentComponent } from './pages/student/student.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { AddtimetableComponent } from './pages/addtimetable/addtimetable.component';
import { LearningResultComponent } from './pages/learning-result/learning-result.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,
  children: [
    {path: 'user', component: UserComponent},
    {path: 'course', component: CourseComponent},
    {path: 'sptraining', component: SpecializedTrainingComponent},
    {path: 'lecturer', component: LecturerComponent},
    {path: 'university', component: UniversitymajorComponent},
    {path: 'student', component: StudentComponent},
    {path:'timetable',component:TimetableComponent},
    {path:'addtimetable',component:AddtimetableComponent},
    {path:'learnresult',component:LearningResultComponent},
    {path:'classroom',component:ClassroomComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
