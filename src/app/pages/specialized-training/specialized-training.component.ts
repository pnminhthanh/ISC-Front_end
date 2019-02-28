import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SpecialiazedTraining, SpecializedTrainingService } from 'src/app/services/specialized-training.service';

@Component({
  selector: 'app-specialized-training',
  templateUrl: './specialized-training.component.html',
  styleUrls: ['./specialized-training.component.css']
})
export class SpecializedTrainingComponent implements OnInit {

  modalRef: BsModalRef;
  test: string;
  specializedTraining: SpecialiazedTraining = {} as SpecialiazedTraining;
  specializedTrainings: SpecialiazedTraining[];

  @ViewChild('modal') modal: ModalDirective;
  constructor(private sptrainingService: SpecializedTrainingService, private modalService: BsModalService) { }

  ngOnInit() {
    this.sptrainingService.getAll().subscribe(
      result => {
        console.log(result);
        this.specializedTrainings = result.data;
        console.log(this.specializedTrainings);
    });
  }

  loadData() {
    this.sptrainingService.getAll().subscribe(
      result => {
        console.log(result);
        this.specializedTrainings = result.data;
    });
  }
  
  showModal(event = null, TrainingId: number = 0) {
    console.log(TrainingId);
    if (event) {
      event.preventDefault();
    }
    if (TrainingId > 0) {
      this.sptrainingService.get(TrainingId).subscribe( result => {
        this.specializedTraining = result.data;
        this.modal.show();
      });
    } else {
      this.specializedTraining = {} as SpecialiazedTraining;
      this.modal.show();
    }
    this.modal.show();
  }

  save() {
    if (this.specializedTraining.trainingId === undefined || this.specializedTraining.trainingId === 0) {
      this.sptrainingService.add(this.specializedTraining).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.sptrainingService.update(this.specializedTraining, this.specializedTraining.trainingId).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }

  delete(event = null, TrainingId) {
    event.preventDefault();
    this.sptrainingService.delete(TrainingId).subscribe(result => {
      const deletedMajor = this.specializedTrainings.find(x => x.trainingId === TrainingId);
      if (result.errorCode === 0) {
        const index = this.specializedTrainings.indexOf(deletedMajor);
        if (deletedMajor) {
          this.specializedTrainings.splice(index);
        }
      }
    });
    this.loadData();
  }
}
