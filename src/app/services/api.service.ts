import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'https://localhost:44324/api/';
  apiUrl = {
    classroom: this.baseUrl + 'classroom',
  };
}
