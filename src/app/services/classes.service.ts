import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Course } from './course.service';
import { Subject } from './subject.service';

export interface ClassesRespone{
  errorCode:number;
  data:Classes;
  Message:string;
}
export interface ClassessRespone{
  errorCode:number;
  data:Classes [];
  Message:string;
}
export interface Classes{
  id:number;
  courseid:number;
  subjectid:number;
  percentBan:number;
  passingscore:number;
  name: string;
  course : Course;
  subject : Subject;
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http:HttpClient, private api:ApiService) { }

  getall():Observable<ClassessRespone>{
    return this.http.get<ClassessRespone>(this.api.apiUrl.classes);
  }
  getone(id):Observable<ClassesRespone>{
    return this.http.get<ClassesRespone>(this.api.apiUrl.classes + '/' + id);
  }
  get(id):Observable<ClassessRespone>{
    return this.http.get<ClassessRespone>(this.api.apiUrl.classes + '/' + id);
  }
}
