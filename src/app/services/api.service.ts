import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'https://localhost:44356/api/';
  apiUrl = {
    academic: this.baseUrl + 'academics',
    companies: this.baseUrl + 'companies',
    degree: this.baseUrl + 'degrees',
    examinationsubject: this.baseUrl + 'examinationsubjects',
    entrancetest: this.baseUrl + 'entrancetests',

    classroom: this.baseUrl + 'classroom',
    course: this.baseUrl + 'courses',
    learnresult: this.baseUrl + 'LearResult',
    lecturer: this.baseUrl + 'lecturers',
    
    major: this.baseUrl + 'majors',
    
    specializedtraining: this.baseUrl + 'specializedtrainings',
    subjects: this.baseUrl + 'subjects',
    user: this.baseUrl + 'users',
    university: this.baseUrl + 'universities',
    worktracks: this.baseUrl + 'worktracks'
  };
}
