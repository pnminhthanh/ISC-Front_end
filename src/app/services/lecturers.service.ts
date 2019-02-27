import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LecturersResponse {
  errorCode: number;
  lecturers: Lecturer[];
  errorMessage: string;
}
export interface LecturerResponse {
  errorCode: number;
  lecturer: Lecturer;
  errorMessage: string;
}

export interface LecturerFull {
  id: number;
  lastName: string;
  firstName: string;
  gender: boolean;
  email: string;
  phone: string;
  identityNumber: string;
  DoB: Date;
  degree: string;
  academic: string;
  startDate: Date;
}

export interface Lecturer {
  id: number;
  userId: number;
  degree: number;
  academic: number;
  startDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  getLecturers(): Observable<LecturersResponse> {
    return this.http.get<LecturersResponse>(this.endpoint + 'lecturers');
  }

  getLecturer(id): Observable<LecturerResponse> {
    return this.http.get<LecturerResponse>(this.endpoint + 'lecturers/' + id);
  }

  addUser(user): Observable<LecturerResponse> {
    console.log(user);
    return this.http.post<LecturerResponse>(this.endpoint + 'users', JSON.stringify(user), this.httpOptions);
  }

  addLecturer(lecturer): Observable<LecturerResponse> {
    console.log(lecturer);
    return this.http.post<LecturerResponse>(this.endpoint + 'lecturers', JSON.stringify(lecturer), this.httpOptions);
  }

  updateLecturer(lecturer: Lecturer): Observable<LecturerResponse> {
    return this.http.put<LecturerResponse>(this.endpoint + 'lecturers/' + lecturer.id, JSON.stringify(lecturer), this.httpOptions);
  }

  deleteLecturer(id): Observable<LecturerResponse> {
    return this.http.delete<LecturerResponse>(this.endpoint + 'lecturers/' + id, this.httpOptions);
  }
}
