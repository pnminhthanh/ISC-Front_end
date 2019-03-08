import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SpecialiazedTraining, SpecializedTrainingService } from 'src/app/services/specialized-training.service';
import { SubjectService, Subject } from 'src/app/services/subject.service';
import { TrainingSubject, TrainingsubjectService } from 'src/app/services/trainingsubject.service';
@Component({
  selector: 'app-specialized-training',
  templateUrl: './specialized-training.component.html',
  styleUrls: ['./specialized-training.component.css']
})
export class SpecializedTrainingComponent implements OnInit {

  modalRef: BsModalRef;
  test: string;
  specializedTraining: SpecialiazedTraining = {} as SpecialiazedTraining;
  specializedTrainings: SpecialiazedTraining[] = [];
  subjects: Subject[] = [];
  subject: Subject = {} as Subject;
  selectedSubjects: Subject[] = [];
  trainingSubject: TrainingSubject = {} as TrainingSubject;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private sptrainingService: SpecializedTrainingService,
     private subjectService: SubjectService, private trainingSubjectService: TrainingsubjectService,
     private modalService: BsModalService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.sptrainingService.getAll().subscribe(
      result => {
        console.log(result);
        this.specializedTrainings = result.data;
    });
    this.subjectService.getAll().subscribe(
      result => {
        this.subjects = result.data;
      }
    );
  }

  showModal(event = null, TrainingId: number = 0) {
    console.log(TrainingId);
    if (event) {
      event.preventDefault();
    }
    if (TrainingId > 0) {
      this.sptrainingService.get(TrainingId).subscribe( result => {
        this.specializedTraining = result.data;
        this.selectedSubjects = this.specializedTraining.listSubjects;
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
        this.sptrainingService.getTheLast().subscribe(result => {
          if (this.selectedSubjects.length > 0) {
            this.selectedSubjects.forEach(item => {
              this.trainingSubject.subjectId = item.subjectId;
              this.trainingSubject.trainingId = result.data.trainingId;
              console.log(this.trainingSubject);
              this.trainingSubjectService.add(this.trainingSubject).subscribe();
            });
          }
        });
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.sptrainingService.update(this.specializedTraining, this.specializedTraining.trainingId).subscribe(result => {
        console.log(this.specializedTraining);
        if (this.selectedSubjects.length > 0) {
          this.selectedSubjects.forEach(item => {
            console.log(item);
            this.trainingSubject.subjectId = item.subjectId;
            this.trainingSubject.trainingId = this.specializedTraining.trainingId;
            console.log(this.trainingSubject);
            // Kiem tra Training Subject da duoc tao trong Training chua
            this.trainingSubjectService.getTrainingSubject(this.trainingSubject).subscribe(result => {
              console.log(result.data);
              if (result.data == null)
              {
                this.trainingSubjectService.add(this.trainingSubject).subscribe();
              }
            });
          });
        } else {
          this.trainingSubjectService.deleteAllByTrainingId(this.specializedTraining.trainingId).subscribe();
        }
        this.modal.hide();
        this.loadData();
      });
    }
  }

  showDeleteModal(event, id) {
    this.specializedTraining.trainingId = id;
    this.sptrainingService.get(id).subscribe( result => {
      this.specializedTraining.listSubjects =  result.data.listSubjects;
    })
    event.preventDefault();
    this.deleteModal.show();
  }

  delete(event = null) {
    event.preventDefault();
    if(this.specializedTraining.listSubjects.length > 0)
    {
      this.trainingSubjectService.deleteAllByTrainingId(this.specializedTraining.trainingId).subscribe();
    }
    this.sptrainingService.delete(this.specializedTraining.trainingId).subscribe(result => {
      const deletedTraining = this.specializedTrainings.find(x => x.trainingId === this.specializedTraining.trainingId);
      if (result.errorCode === 0) {
        const index = this.specializedTrainings.indexOf(deletedTraining);
        if (deletedTraining) {
          this.specializedTrainings.splice(index);
        }
      }
    });
    this.deleteModal.hide();
    this.loadData();
  }

  addSubjectToTraining(id) {
    this.subjectService.get(id).subscribe(
      result => {
        console.log(result);
        this.selectedSubjects.push(result.data);
        console.log(this.selectedSubjects);
      }
    );
  }

  removeFromSelectedSubjects(id) {
    const deletedSubject = this.selectedSubjects.find(x => x.subjectId === id);
    const index = this.selectedSubjects.indexOf(deletedSubject);
    this.selectedSubjects.splice(index);
  }
}
