import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LecturersService, Lecturer } from '../services/lecturers.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})



export class LecturersComponent implements OnInit {

  user: User = {} as User;
  lecturers: Lecturer[] = [];
  lecturer: Lecturer = {} as Lecturer;
  test: string;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(public lecturerService: LecturersService, public userService: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }

    if (id > 0) {
      this.lecturerService.getLecturer(id).subscribe(result => {
        this.lecturer = result.lecturer;
        this.modal.show();
      });
    } else {
      this.lecturer = {} as Lecturer;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    this.lecturer.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  loadData() {
    this.lecturerService.getLecturers().subscribe(result => {
      this.lecturers = result.lecturers;
    });
  }

  save() {
    if (this.lecturer.id === undefined || this.lecturer.id === 0) {
      this.userService.addUser(this.user).subscribe(result => {
        this.lecturer.userId = result.user.id;
        this.lecturerService.addLecturer(this.lecturer).subscribe(aresult => {
          this.modal.hide();
          this.loadData();
        });
      });

    } else {
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
    this.lecturerService.deleteLecturer(this.lecturer.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteLecturer = this.lecturers.find( x => x.id === this.lecturer.id);
        if (deleteLecturer) {
          const index = this.lecturers.indexOf(deleteLecturer);
          this.lecturers.splice(index, 1);
        }
        this.deleteModal.hide();
      }
    });
  }
}
