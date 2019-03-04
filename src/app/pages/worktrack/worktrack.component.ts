import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Worktrack, WorktrackService } from 'src/app/services/worktrack.service';
import { NgxDateTimePickerModule } from  'ngx-date-time-picker';

@Component({
  selector: 'app-worktrack',
  templateUrl: './worktrack.component.html',
  styleUrls: ['./worktrack.component.css']
})
export class WorktrackComponent implements OnInit {

  worktrack: Worktrack = {} as Worktrack;
  worktracks: Worktrack[] = [];
  @ViewChild('modalAdd') modalAdd: ModalDirective;
  @ViewChild('modalDelete') modalDelete: ModalDirective;
  constructor(private worktrackService: WorktrackService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.worktrackService.getAll().subscribe(result => { this.worktracks = result.data; });
  }
  showModal(event = null, modal: ModalDirective, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.worktrackService.get(id).subscribe(result => {
        this.worktrack = result.data;
        modal.show();
      });
    } else {
      this.worktrack = {} as Worktrack;
      modal.show();
    }
  }
  save() {
    if (this.worktrack.id === undefined || this.worktrack.id === 0) {
      this.worktrackService.add(this.worktrack).subscribe(result => {
        this.modalAdd.hide();
        this.loadData();
      });
    } else {
      this.worktrackService.update(this.worktrack).subscribe(result => {
        this.modalAdd.hide();
        this.loadData();
      });
    }
  }
  delete(event = null, id) {
    event.preventDefault();
    this.worktrackService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.worktracks.find(x => x.id === id);
        if (deleteCompany) {
          const index = this.worktracks.indexOf(deleteCompany);
          this.worktracks.splice(index, 1);
          this.modalDelete.hide();
        }
      }
    });
  }
}
