import { Component, OnInit, ViewChild } from '@angular/core';
import { Classroom, ClassroomService} from 'src/app/services/classroom.service';
import { ModalDirective } from 'ngx-bootstrap';
import { userInfo } from 'os';
import { stringify } from 'querystring';
import { load } from '@angular/core/src/render3';
import { LearnResult, LearnresultService } from 'src/app/services/learnresult.service';
import { Course, CourseService } from 'src/app/services/course.service';
import { Classes, ClassesService } from 'src/app/services/classes.service';
@Component({
  selector: 'app-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: ['./learning-result.component.css']
})
export class LearningResultComponent implements OnInit {
  learnResults : LearnResult[];
  learnResult: LearnResult = {} as LearnResult;
  courses : Course [];
  course: Course = {} as Course;
  classess: Classes [];
  classes: Classes = {} as Classes;
  @ViewChild('modalMessage') modalMessage : ModalDirective;
  
  constructor(private learnResultService : LearnresultService, 
              private courseService : CourseService,private classesService: ClassesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.courseService.getAll().subscribe(result => {
      this.courses = result.data;
    });
  }

  search(){
    if(this.course.courseId === undefined || this.course.courseId === 0 || this.classes.id === undefined || this.classes.id === 0){
      this.modalMessage.show();
    }else{
      this.learnResultService.getall(this.course.courseId, this.classes.id).subscribe(result=>{
        this.learnResults = result.data;
      });
    }
  }

  onChangeCourse(newValue){ 
      this.course.courseId = newValue;
      this.classesService.get(this.course.courseId).subscribe(result=> {
        this.classess = result.data;
    });
    this.classes.id = undefined;
  }

  onChangeClasses(newValue){ 
    this.classes.id = newValue;
    console.log(this.classes.id);
  }



}
