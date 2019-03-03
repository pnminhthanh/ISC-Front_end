import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { CourseComponent } from './pages/course/course.component';
import { SpecializedTrainingComponent } from './pages/specialized-training/specialized-training.component';
import { from } from 'rxjs';
import { LecturerComponent } from './pages/lecturer/lecturer.component';
import { UniversitymajorComponent } from './pages/universitymajor/universitymajor.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,
  children: [
    {path: 'user', component: UserComponent},
    {path: 'course', component: CourseComponent},
    {path: 'sptraining', component: SpecializedTrainingComponent},
    {path: 'lecturers', component: LecturerComponent},
    {path: 'university', component: UniversitymajorComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
