import { Component, OnInit, Input } from '@angular/core';
import { LecturersService } from '../lecturers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturer-add',
  templateUrl: './lecturer-add.component.html',
  styleUrls: ['./lecturer-add.component.css']
})
export class LecturerAddComponent implements OnInit {

  lecturers: any = [];

  @Input() user = { IsStudent: false};
  @Input() lecturer = {};

  constructor(public lecService: LecturersService, private router: Router) { }

  ngOnInit() {

  }


  addLecturer() {
    this.lecService.addUser(this.user).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });

    this.lecService.addLecturer(this.lecturer).subscribe((result) => {
      this.router.navigate(['']);
    }, (err) => {
      console.log(err);
    });
  }

  delete(id) {
    this.lecService.deleteLecturer(id)
      .subscribe(res => {
        this.router.navigate(['/dashboard/lecturers']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  onSubmit() {
    // if (this.lecturer.LecturerID === null) {

    // }
    this.addLecturer();
  }

  getLecturerForEdit(id) {
    this.lecService.getLecturer(id).subscribe((data: {}) => {
      console.log(data);
      this.lecturer = data;
    });
  }

}
