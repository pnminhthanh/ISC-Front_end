import { Component, OnInit, ViewChild } from '@angular/core';
import { Classroom, ClassroomService} from 'src/app/services/classroom.service';
import { ModalDirective } from 'ngx-bootstrap';
import { userInfo } from 'os';
import { stringify } from 'querystring';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  classrooms : Classroom[];
  classroom: Classroom = {} as Classroom;
   @ViewChild('modalAdd') modalAdd : ModalDirective;
   @ViewChild('modalDelete') modalDelete : ModalDirective;
   today : Date;

  constructor(private classroomservice: ClassroomService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.classroomservice.getall().subscribe(result => {
       this.classrooms = result.data;
    });
  }
  
  save(){
    if(this.classroom.id === undefined || this.classroom.id === 0){
      this.today = new Date();
      this.classroom.dateadded = this.today;
      this.classroomservice.add(this.classroom).subscribe(result=>{
        this.modalAdd.hide();
        this.loadData();
      });
    }else{
      this.classroomservice.update(this.classroom).subscribe(result=>{
        this.modalAdd.hide();
        this.loadData();
      });
    }
  }

  delete(event = null, id){
    event.preventDefault();
    this.classroomservice.delete(id).subscribe(result=>{
      if(result.errorCode === 0)
      {
        const delelteRoom = this.classrooms.find(x=>x.id === id);
        if(delelteRoom){
          const index = this.classrooms.indexOf(delelteRoom);
          this.classrooms.splice(index,1);
          this.modalDelete.hide();
        }
      }
    });
    this.classroom.id = null;
  }

  showModal(event = null,modal : ModalDirective,id : number = 0){
    if(event){
      event.preventDefault();
    }
    if(id > 0){
      this.classroomservice.get(id).subscribe(result=>{
        this.classroom = result.data;
        this.classroom.id = id;
        modal.show();
      });
    }else{
      this.classroom= {} as Classroom;
      modal.show();
    }
  }
}
