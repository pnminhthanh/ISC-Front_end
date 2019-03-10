import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.service';
import { ApiService } from './api.service';

export interface StudentsFullResponse {
  errorCode: number;
  data: StudentFull[];
  message: string;
}

export interface StudentsResponse {
  errorCode: number;
  data: Student[];
  message: string;
}
export interface StudentResponse {
  errorCode: number;
  data: Student;
  message: string;
}

export interface StudentFull {
  userid: number;
  usE_USERID: number;
  studentid: number;
  academicrank: number;
  startdate: Date;
  student: object;
  academic: object;
  user: User;
}

export interface Student {
  userid: number;
  usE_USERID: number;
  studentid: number;
  academicrank: number;
  startday: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getStudents(): Observable<StudentsFullResponse> {
    return this.http.get<StudentsFullResponse>(this.apiService.apiUrl.student);
  }

  getStudent(id): Observable<StudentResponse> {
    const url = `${this.apiService.apiUrl.student}/${id}`;
    return this.http.get<StudentResponse>(url);
  }

  addStudent(student: Student): Observable<StudentResponse> {
    console.log(student);
    return this.http.post<StudentResponse>(this.apiService.apiUrl.student, student);
  }

  updateStudent(student: Student): Observable<StudentResponse> {
    const url = `${this.apiService.apiUrl.student}/${student.userid}`;
    return this.http.put<StudentResponse>(url, student);
  }

  deleteStudent(id): Observable<StudentResponse> {
    const url = `${this.apiService.apiUrl.student}/${id}`;
    return this.http.delete<StudentResponse>(url);
  }
}
