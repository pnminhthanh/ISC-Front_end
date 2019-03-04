import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ExaminationSubject, ExaminationSubjectService } from '../../services/examinationsubject.service';

@Component({
  selector: 'app-examinationsubject',
  templateUrl: './examinationsubject.component.html',
  styleUrls: ['./examinationsubject.component.css']
})
export class ExaminationSubjectComponent implements OnInit {
  examinationsubjects: ExaminationSubject[] = [];
  examinationsubject: ExaminationSubject = {} as ExaminationSubject;
  test: string;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private examinationsubjectService: ExaminationSubjectService) {  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.examinationsubjectService.getAll().subscribe(result => {
      this.examinationsubjects = result.data;
    });
  }
  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.examinationsubjectService.get(id).subscribe(result => {
        this.examinationsubject = result.data;
        this.examinationsubject.id = id;
        this.modal.show();
      });
    } else {
      this.examinationsubject = {} as ExaminationSubject;
      this.modal.show();
    }
  }
  save() {
    if (this.examinationsubject.id === undefined || this.examinationsubject.id === 0) {
      this.examinationsubjectService.add(this.examinationsubject).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.examinationsubjectService.update(this.examinationsubject).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  showDeleteModal(event, id) {
    this.examinationsubject.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }
  delete() {
    this.examinationsubjectService.delete(this.examinationsubject.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deletedExaminationSubject = this.examinationsubjects.find( x => x.id === this.examinationsubject.id);
        if (deletedExaminationSubject) {
          const index = this.examinationsubjects.indexOf(deletedExaminationSubject);
          this.examinationsubjects.splice(index, 1);
        }
        this.deleteModal.hide();
      }
    });
  }
}

