import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SubjectService, Subject } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: Subject[] = [];
  subject: Subject = {} as Subject;
  @ViewChild('modalAdd') modalAdd: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() { this.subjectService.getAll().subscribe(result => { this.subjects = result.data; }); }
  showModal(event = null, modal: ModalDirective, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.subjectService.get(id).subscribe(result => {
        this.subject = result.data;
        modal.show();
      });
    } else {
      this.subject = {} as Subject;
      modal.show();
    }
  }
  save() {
    if (this.subject.subjectid === undefined || this.subject.subjectid === 0) {
      this.subjectService.add(this.subject).subscribe(result => {
        this.modalAdd.hide();
        this.loadData();
      });
    } else {
      this.subjectService.update(this.subject).subscribe(result => {
        this.modalAdd.hide();
        this.loadData();
      });
    }
  }
  delete(event = null, id) {
    event.preventDefault();
    this.subjectService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteSubject = this.subjects.find(x => x.subjectid === id);
        if (deleteSubject) {
          const index = this.subjects.indexOf(deleteSubject);
          this.subjects.splice(index, 1);
          this.modalDelete.hide();
        }
      }
    });
  }
}
