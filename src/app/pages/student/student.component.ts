import { Component, OnInit, ViewChild } from '@angular/core';
import { University } from 'src/app/services/university.service';
import { Major } from 'src/app/services/major.service';
import { User } from 'src/app/services/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  universities: University[] = [];
  majors: Major[] = [];
  user: User = { gender: 1} as User;
  // students: LecturerFull[] = [];
  // student: Lecturer = {} as Lecturer;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }

  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }

    if (id > 0) {
      // this.studentService.getLecturer(id).subscribe(result => {
      //   this.student = result.data;
      //   this.student.startday = this.datetimeService.formatDatetimeData(this.student.startday);
      //   this.userService.getUser(this.student.usE_USERID).subscribe(aresult => {
      //     this.user = aresult.data;
      //     this.user.dob = this.datetimeService.formatDatetimeData(this.user.dob);
      //     console.log(this.user);
      //     this.modal.show();
      //   });
      // });
    } else {
      // this.student = {} as Lecturer;
      this.modal.show();
    }
  }
}
