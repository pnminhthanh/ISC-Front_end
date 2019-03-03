import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Major, MajorService } from '../../services/major.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { University, UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-universitymajor',
  templateUrl: './universitymajor.component.html',
  styleUrls: ['./universitymajor.component.css']
})
export class UniversitymajorComponent implements OnInit {

  universities: University[] = [];
  university: University = {} as University;
  majors: Major[] = [];
  major: Major = {} as Major;

  @ViewChild('uniModal') uniModal: ModalDirective;
  @ViewChild('majorModal') majorModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('object') object: ElementRef;

  constructor(private majorService: MajorService, private universityService: UniversityService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.universityService.getUniversities().subscribe(result => {
      console.log(this.universities);
      this.universities = result.data;
    });
    this.majorService.getMajors().subscribe(result => {
      this.majors = result.data;
    });
  }

  showModal(kind: string, event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      if (kind === 'university') {
        this.universityService.getUniversity(id).subscribe(result => {
        this.university = result.data;
        this.uniModal.show();
        });
      } else if (kind === 'major') {
        this.majorService.getMajor(id).subscribe(result => {
        this.major = result.data;
        this.majorModal.show();
        });
      }
    } else {
      if (kind === 'university') {
        this.university = {} as University;
        this.uniModal.show();
      } else if (kind === 'major') {
        this.major = {} as Major;
        this.majorModal.show();
      }
    }
  }

  save(kind) {
    if (kind === 'university') {
      if (this.university.id === undefined || this.university.id === 0) {
        console.log(this.university);
        this.universityService.addUniversity(this.university).subscribe(result => {
          this.uniModal.hide();
          this.loadData();
        });
      } else {
        this.universityService.updateUniversity(this.university).subscribe(result => {
          this.uniModal.hide();
          this.loadData();
        });
      }
    } else if (kind === 'major') {
      if (this.major.id === undefined || this.major.id === 0) {
        this.majorService.addMajor(this.major).subscribe(result => {
          this.majorModal.hide();
          this.loadData();
        });
      } else {
        this.majorService.updateMajor(this.major).subscribe(result => {
          this.majorModal.hide();
          this.loadData();
        });
      }
    }
  }

  showDeleteModal(kind, event, id) {
    if (kind === 'university') {
      this.university.id = id;
      this.object.nativeElement.value = 'university';

    } else if (kind === 'major') {
      this.major.id = id;
      this.object.nativeElement.value = 'major';
    }
    event.preventDefault();
    this.deleteModal.show();
  }

  delete() {
    if (this.object.nativeElement.value === 'university') {
      this.universityService.deleteUniversity(this.university.id).subscribe(result => {
        if (result.errorCode === 0) {
          const deletedUniversity = this.universities.find( x => x.id === this.university.id);
          if (deletedUniversity) {
            const index = this.universities.indexOf(deletedUniversity);
            this.universities.splice(index, 1);
          }
        }
      });
    } else if (this.object.nativeElement.value === 'major') {
      this.majorService.deleteMajor(this.major.id).subscribe(result => {
        if (result.errorCode === 0) {
          const deletedMajor = this.majors.find( x => x.id === this.major.id);
          if (deletedMajor) {
            const index = this.majors.indexOf(deletedMajor);
            this.majors.splice(index, 1);
          }
        }
      });
    }
    this.deleteModal.hide();
    this.object.nativeElement.value = '';
  }
}
