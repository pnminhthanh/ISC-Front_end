import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LecturersService, Lecturer, LecturerFull } from '../services/lecturers.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})



export class LecturersComponent implements OnInit {

  user: User = {} as User;
  lecturers: LecturerFull[] = [];
  lecturer: Lecturer = {} as Lecturer;
  test: string;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(public lecturerService: LecturersService, public userService: UserService) {
  }

  ngOnInit() {
    this.loadData();
  }

  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }

    if (id > 0) {
      this.lecturerService.getLecturer(id).subscribe(result => {
        this.lecturer = result.data;
        this.userService.getUser(this.lecturer.usE_USERID).subscribe(aresult => {
          this.user = aresult.data;
          this.modal.show();
        });
      });
    } else {
      this.lecturer = {} as Lecturer;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    this.lecturer.userid = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  loadData() {
    this.lecturerService.getLecturers().subscribe(result => {
      this.lecturers = result.data;
      console.log(this.lecturers);
    });
  }

  save() {
    if (this.lecturer.userid === undefined || this.lecturer.userid === 0) {
      this.user.isStudent = false;
      this.userService.addUser(this.user).subscribe(result => {
        this.lecturer.usE_USERID = result.data.id;
        this.lecturerService.addLecturer(this.lecturer).subscribe(aresult => {
          this.modal.hide();
          this.loadData();
        });
      });

    } else {
      this.user.isStudent = false;
      this.userService.updateUser(this.user).subscribe( result => {
        this.lecturerService.updateLecturer(this.lecturer).subscribe(aresult => {
          this.modal.hide();
          this.loadData();
        });
      }
      );
    }
  }

  delete() {
    this.lecturerService.deleteLecturer(this.lecturer.userid).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteLecturer = this.lecturers.find( x => x.userid === this.lecturer.userid);
        if (deleteLecturer) {
          const index = this.lecturers.indexOf(deleteLecturer);
          this.lecturers.splice(index, 1);
        }
        this.deleteModal.hide();
      }
    });
  }
}
