import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SpecialiazedTraining, SpecializedTrainingService } from 'src/app/services/specialized-training.service';
import { SubjectService, SubjectInterface } from 'src/app/services/subject.service';
import { TrainingSubject, TrainingsubjectService } from 'src/app/services/trainingsubject.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


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
  subjects: SubjectInterface[] = [];
  subject: SubjectInterface = {} as SubjectInterface;
  selectedSubjects: SubjectInterface[] = [];
  trainingSubject: TrainingSubject = {} as TrainingSubject;
  listTrainingSubjectsDeleted: number[] = [];


  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private sptrainingService: SpecializedTrainingService,
     private subjectService: SubjectService, private trainingSubjectService: TrainingsubjectService,
     private modalService: BsModalService) { }

  ngOnInit() {
    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.loadData();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {this.dtTrigger.next(); }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }

  alertMessage(message) {
    this.alert.next(message);
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
    if (event) {
      event.preventDefault();
    }
    if (TrainingId > 0) {
      this.sptrainingService.get(TrainingId).subscribe( result => {
        this.specializedTraining = result.data;
        this.selectedSubjects = this.specializedTraining.listSubjects;
        console.log(this.selectedSubjects);
        this.modal.show();
      });
    } else {
      this.specializedTraining = {} as SpecialiazedTraining;
      this.modal.show();
    }
    console.log(this.listTrainingSubjectsDeleted);
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
          this.alertMessage(result.message);
        });
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.sptrainingService.update(this.specializedTraining, this.specializedTraining.trainingId).subscribe(result => {
        console.log(this.specializedTraining);
        if (this.listTrainingSubjectsDeleted.length > 0) {
          this.listTrainingSubjectsDeleted.forEach(item => {
            this.deleteSelectedSubject(item);
            console.log(this.selectedSubjects);
          });
          this.listTrainingSubjectsDeleted = null;
        }
        if (this.selectedSubjects.length > 0) {
          this.selectedSubjects.forEach(item => {
            const addSubject = {} as TrainingSubject;
            addSubject.subjectId = item.subjectId;
            addSubject.trainingId = this.specializedTraining.trainingId;
            console.log(addSubject);
            this.trainingSubjectService.getTrainingSubject(this.trainingSubject).subscribe(result => {
              if (result.data === undefined) {
                console.log(result.data);
                this.trainingSubjectService.add(addSubject).subscribe();
              }
              this.alertMessage(result.message);
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
      this.alertMessage(result.message);
    });
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
      this.alertMessage(result.message);
    });
    this.deleteModal.hide();
    this.loadData();
  }

  addSubjectToTraining(data: SubjectInterface) {
      this.selectedSubjects.push(data);
  }

  // Xoa mon hoc khoi danh sach mon hoc cua chuong trinh hoc tren modal
  removeFromSelectedSubjects(index) {
    const deleteSubjectId = this.selectedSubjects[index].subjectId;
    const item = {} as TrainingSubject;
    item.subjectId = deleteSubjectId;
    item.trainingId = this.specializedTraining.trainingId;
    this.selectedSubjects.splice(index, 1);
    this.trainingSubjectService.getTrainingSubject(item).subscribe(result => {
      if(result.data !== null) {
        this.listTrainingSubjectsDeleted.push(result.data.trainingSubjectId);
      }
      console.log(this.selectedSubjects);
      console.log(this.listTrainingSubjectsDeleted);
    });
  }

  deleteSelectedSubject(TrainingSubjectId) {
    this.trainingSubjectService.delete(TrainingSubjectId).subscribe();
  }

  checkSelectedSubject(id) {
    console.log(id);
    console.log(this.selectedSubjects);
    this.subjectService.get(id).subscribe(
      result => {
        console.log(result.data);
        const index = this.selectedSubjects.filter(function(el) {
          if (el.subjectId === id) {
            return el;
          }
        });
        console.log(index);
        if (index.length > 0) {
          alert('Subject has existed in list selected subjects!');
        } else {
          this.addSubjectToTraining(result.data);
        }
      }
    );
  }
}
