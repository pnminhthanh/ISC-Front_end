import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective, BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-specialized-training',
  templateUrl: './specialized-training.component.html',
  styleUrls: ['./specialized-training.component.css']
})
export class SpecializedTrainingComponent implements OnInit {

  modalRef: BsModalRef;
  test: string;

  @ViewChild('modal') modal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }

  showModal(event = null, id: number = 0) {
    event.preventDefault();
    this.modal.show();
  }
}
