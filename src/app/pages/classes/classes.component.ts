import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { load } from '@angular/core/src/render3';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap';
import { ClassesService, Classes } from 'src/app/services/classes.service';
import { Course, CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement : DataTableDirective;
  classes : Classes = {} as Classes;
  classess : Classes[];
  courses : Course [];
  course: Course = {} as Course;
  constructor(private classesService : ClassesService, private courseService : CourseService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength: 10
    };
    this.loadData();
  }

  loadData(){
    this.classesService.getall().subscribe(result=>{
      this.classess = result.data;
      this.rerender();
    });
  }

  showModal(event = null, modal: ModalDirective, id: number = 0) {
    this.courseService.getAll().subscribe(result=>{
    this.courses = result.data;
    });
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.classesService.getone(id).subscribe(result => {
        this.classes = result.data;
        this.classes.id = id;
        modal.show();
      });
    } else {
      this.classes = {} as Classes;
      modal.show();
    }
  }

  //dataTable
  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
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
