import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Course {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  note: string;
}

export class CourseResponse {
  errorCode: number;
  errorMessage: string;
  course: Course;
}

export class CoursesResponse {
  errorCode: number;
  errorMessage: string;
  course: Course[];
}

export class CourseService {
  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<CoursesResponse> {
    return;
  }

}
