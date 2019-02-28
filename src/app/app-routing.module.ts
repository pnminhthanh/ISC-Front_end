import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { AddtimetableComponent } from './pages/addtimetable/addtimetable.component';
import { LearningResultComponent } from './pages/learning-result/learning-result.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
  children:[
    {path:'timetable',component:TimetableComponent},
    {path:'addtimetable',component:AddtimetableComponent},
    {path:'learnresult',component:LearningResultComponent},
    {path:'classroom',component:ClassroomComponent}
  ]}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
