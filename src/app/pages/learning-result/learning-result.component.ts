import { Component, OnInit, ViewChild } from '@angular/core';
import { Classroom, ClassroomService} from 'src/app/services/classroom.service';
import { ModalDirective } from 'ngx-bootstrap';
import { userInfo } from 'os';
import { stringify } from 'querystring';
import { load } from '@angular/core/src/render3';
import { DatetimeService } from '../../services/datetime.service';
import { LearnResult, LearnresultService, Learn } from 'src/app/services/learnresult.service';
import { Course, CourseService } from 'src/app/services/course.service';
import { ClassesService, classe } from 'src/app/services/classes.service';
import { StudentService, Student } from 'src/app/services/student.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UserService, User } from 'src/app/services/user.service';
@Component({
  selector: 'app-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: ['./learning-result.component.css']
})
export class LearningResultComponent implements OnInit {
  learnResults : LearnResult[];
  learnResult: LearnResult = {} as LearnResult;
  courses : Course [];
  classe: classe = {} as classe;
  learn: Learn = {} as Learn;
  classes: classe [];
  course: Course = {} as Course;
  student: Student ={} as Student;
  user: User = {} as User;
  @ViewChild('modalMessage') modalMessage : ModalDirective;
  @ViewChild('modalEdit') modalEdit: ModalDirective;
  @ViewChild(DataTableDirective) dtElement : DataTableDirective;
  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject();
  
  constructor(private learnResultService : LearnresultService, 
              private courseService : CourseService,private classesService: ClassesService
              ,private classService : ClassesService, private studenService : StudentService
              ,private userService : UserService,private datetimeService : DatetimeService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength: 10
    };
    this.loadData();
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  loadData() {
    this.courseService.getAll().subscribe(result => {
      this.courses = result.data;
    });
  }

  search(){
    if(this.course.courseId === undefined || this.course.courseId === 0 || this.classe.id === undefined || this.classe.id === 0){
      this.modalMessage.show();
    }else{
      this.learnResultService.getall(this.course.courseId, this.classe.id).subscribe(result=>{
        this.learnResults = result.data;
      });
    }
  }
  showModalEdit(event = null,id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.learnResultService.get(id).subscribe(result => {
        this.learn = result.data;
        this.studenService.getStudent(this.learn.idstudent).subscribe(result => {
          this.student = result.data;
          this.userService.getUser(this.student.userid).subscribe(aresult => {
            this.user = aresult.data;
            this.user.dob = this.datetimeService.formatDatetimeData(this.user.dob);
          });
        });
        this.classesService.get(this.learn.classid).subscribe(res=>{
          this.classe = res.data;
        });
        this.modalEdit.show();
      });
    } 
  }
  onChangeCourse(newValue){ 
      this.course.courseId = newValue;
      this.classesService.getCourse(this.course.courseId).subscribe(result=> {
        this.classes = result.data;
    });
    this.classe.id = undefined;
  }

  onChangeClasses(newValue){ 
    this.classe.id = newValue;
  }

  ngAfterViewInit(): void{
    this.dtTrigger.next();
  }
  rerender(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
