import { Component, OnInit } from '@angular/core';
import { LecturersService } from '../lecturers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent implements OnInit {

  lecturers: any = [];

  constructor(public lecService: LecturersService, private router: Router) { }

  ngOnInit() {
    document.getElementById('modal-box').style.display = 'none';
    this.getLecturers();
  }

  toggleFormInput() {
    document.getElementById('modal-box').style.display = 'block';
  }

  getLecturers() {
    this.lecturers = [];
    this.lecService.getLecturers().subscribe((data: {}) => {
      console.log(data);
      this.lecturers = data;
    });
  }

  delete(id) {
    this.lecService.deleteLecturer(id)
      .subscribe(res => {
        this.getLecturers();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
