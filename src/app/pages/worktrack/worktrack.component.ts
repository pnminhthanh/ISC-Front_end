import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Worktrack, WorktrackService } from 'src/app/services/worktrack.service';
import { DatetimeService } from 'src/app/services/datetime.service';
import { CompanyService, Company } from 'src/app/services/company.service';

@Component({
  selector: 'app-worktrack',
  templateUrl: './worktrack.component.html',
  styleUrls: ['./worktrack.component.css']
})
export class WorktrackComponent implements OnInit {

  worktrack: Worktrack = {} as Worktrack;
  worktracks: Worktrack[] = [];
  company: Company = {} as Company;
  companies: Company[] = [];
  companyname: string;
  studentname: string;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private worktrackService: WorktrackService, private datetimeService: DatetimeService,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.loadData();
  }
  // loginFrm(form) {
  //   console.log(form.value);
  // }
  loadData() {
    this.worktrackService.getAll().subscribe(result => {
      this.worktracks = result.data;
    });
  }
  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.worktrackService.get(id).subscribe(result => {
        this.worktrack = result.data;
        this.companyService.get(this.worktrack.companyid).subscribe(r => this.companyname = r.data.companyname);
        this.worktrack.startdate = this.datetimeService.formatDatetimeData(this.worktrack.startdate);
        this.worktrack.contractdate = this.datetimeService.formatDatetimeData(this.worktrack.contractdate);
        this.modal.show();
      });
    } else {
      this.worktrack = {} as Worktrack;
      this.modal.show();
    }
  }
  onChangeCourse(id) {
    this.company.companyid = id;
    this.companyService.get(id).subscribe(result => {
    // this.classess = result.data;
  });
  // this.classes.id = undefined;
}
  showDeleteModal(event = null, id) {
    if (event) {
      event.preventDefault();
    }
    this.worktrack.id = id;
    this.deleteModal.show();
  }
  save() {
    if (this.worktrack.id === undefined || this.worktrack.id === 0) {
      this.worktrackService.add(this.worktrack).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.worktrackService.update(this.worktrack).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  delete(id) {
    event.preventDefault();
    this.worktrackService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.worktracks.find(x => x.id === id);
        if (deleteCompany) {
          const index = this.worktracks.indexOf(deleteCompany);
          this.worktracks.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
}
