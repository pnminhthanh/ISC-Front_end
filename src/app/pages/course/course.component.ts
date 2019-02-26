import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Course, CourseService } from 'src/app/services/course.service';

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

  @ViewChild('modal') modal: ModalDirective;
  constructor(private courseService: CourseService, private modalService: BsModalService) { }
  ngOnInit() {
  //   $(document).ready(function () {
  //     $('#selectTrainingsinModal').select2({
  //         dropdownParent: $("#addCourse")
  //     });
  //     $('#datepicker').datepicker({
  //         autoclose: true
  //     });
  // });
  //   $('#addCourse').on('shown.bs.modal', function () {
  //       $('#datepicker').css('z-index', '2051');
  //       $('#datepicker').datepicker({
  //           autoclose: true
  //       });
  //   });
  }

  showModal(event = null, id: number = 0) {
    this.modal.show();
  }

  save() {

  }
}
