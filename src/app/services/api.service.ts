import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'https://localhost:44324/api/';
  apiUrl = {
    classroom: this.baseUrl + 'classroom',
    learnresult: this.baseUrl + 'LearResult',
    course: this.baseUrl + 'courses',
    specializedtraining: this.baseUrl + 'specializedtrainings',

    examinationsubject: this.baseUrl + 'examinationsubjects',
    entrancetest: this.baseUrl + 'entrancetests',

    lecturer: this.baseUrl + 'lecturers',
    academic: this.baseUrl + 'academics',
    degree: this.baseUrl + 'degrees',
    user: this.baseUrl + 'users',
    university: this.baseUrl + 'universities',
    major: this.baseUrl + 'majors'


  };
}
