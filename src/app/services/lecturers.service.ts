import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.service';

export interface LecturersFullResponse {
  errorCode: number;
  data: LecturerFull[];
  errorMessage: string;
}

export interface LecturersResponse {
  errorCode: number;
  data: Lecturer[];
  errorMessage: string;
}
export interface LecturerResponse {
  errorCode: number;
  data: Lecturer;
  errorMessage: string;
}

export interface LecturerFull {
  userid: number;
  use_userId: number;
  degreeid: number;
  academicrank: number;
  startdate: Date;
  degree: object;
  academic: object;
  user: User;
}

export interface Lecturer {
  id: number;
  use_userId: number;
  degreeId: number;
  academicRank: number;
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

  getLecturers(): Observable<LecturersFullResponse> {
    return this.http.get<LecturersFullResponse>(this.endpoint + 'lecturers');
  }

  getLecturer(id): Observable<LecturerResponse> {
    return this.http.get<LecturerResponse>(this.endpoint + 'lecturers/' + id);
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
