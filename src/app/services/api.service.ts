import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'https://localhost:44324/api/';
  apiUrl = {
    course: this.baseUrl + 'courses',
    specializedtraining: this.baseUrl + 'specializedtrainings',
    lecturer: this.baseUrl + 'lecturers',
    academic: this.baseUrl + 'academics',
    degree: this.baseUrl + 'degrees',
    user: this.baseUrl + 'users'
  };
}
