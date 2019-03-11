import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SubjectService, SubjectInterface } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: SubjectInterface[] = [];
  subject: SubjectInterface = {} as SubjectInterface;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() { this.subjectService.getAll().subscribe(result => { this.subjects = result.data; }); }

  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.subjectService.get(id).subscribe(result => {
        this.subject = result.data;
        this.modal.show();
      });
    } else {
      this.subject = {} as SubjectInterface;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    if (event) {
      event.preventDefault();
    }
    this.subject.subjectId = id;
    this.deleteModal.show();
  }

  save() {
    if (this.subject.subjectId === undefined || this.subject.subjectId === 0) {
      this.subjectService.add(this.subject).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.subjectService.update(this.subject).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  delete(id) {
    event.preventDefault();
    this.subjectService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteSubject = this.subjects.find(x => x.subjectId === id);
        if (deleteSubject) {
          const index = this.subjects.indexOf(deleteSubject);
          this.subjects.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
}
