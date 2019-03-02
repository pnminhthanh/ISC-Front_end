import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { LecturersComponent } from './lecturers/lecturers.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,
  children: [
    {path: 'user', component: UserComponent},
    {path: 'lecturers', component: LecturersComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
