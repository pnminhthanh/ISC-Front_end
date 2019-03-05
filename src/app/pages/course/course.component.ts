import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Course, CourseService } from 'src/app/services/course.service';
import { SpecialiazedTraining, SpecializedTrainingService } from 'src/app/services/specialized-training.service';
import { DatetimeService } from 'src/app/services/datetime.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  modalRef: BsModalRef;
  test: string;
  course: Course = {} as Course;
  courses: Course [] = [];
  trainings: SpecialiazedTraining[] = [];

  @ViewChild('modal') modal: ModalDirective;
  constructor(private courseService: CourseService, private modalService: BsModalService
    , private trainingService: SpecializedTrainingService, private datetimeService: DatetimeService) { }
  ngOnInit() {
    this.courseService.getAll().subscribe(
      result => {
        console.log(result);
        this.courses = result.data;
        console.log(this.courses);
    });
    this.trainingService.getAll().subscribe(
      result => {
        console.log(result);
        this.trainings = result.data;
        console.log(this.trainings);
      });
  }

  loadData() {
    this.courseService.getAll().subscribe(
      result => {
        console.log(result);
        this.courses = result.data;
    });
  }

  showModal(event = null, Id: number = 0) {
    console.log(Id);
    if (event) {
      event.preventDefault();
    }
    if (Id > 0) {
      this.courseService.get(Id).subscribe( result => {
        this.course = result.data;
        this.course.enddate = this.datetimeService.formatDatetimeData(this.course.enddate);
        this.course.startdate = this.datetimeService.formatDatetimeData(this.course.startdate);
        this.modal.show();
      });
    } else {
      this.course = {} as Course;
      this.modal.show();
    }
    this.modal.show();
  }

  save() {
    if (this.course.courseId === undefined || this.course.courseId === 0) {
      this.courseService.add(this.course).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.courseService.update(this.course, this.course.courseId).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }

  delete(event = null, Id) {
    event.preventDefault();
    this.courseService.delete(Id).subscribe(result => {
      const deletedMajor = this.courses.find(x => x.courseId === Id);
      if (result.errorCode === 0) {
        const index = this.courses.indexOf(deletedMajor);
        if (deletedMajor) {
          this.courses.splice(index);
        }
      }
    });
    this.loadData();
  }
}
