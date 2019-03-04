import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface LearnResultsRespone{
  errorCode:number;
  data:LearnResult [];
  Message:string;
}
export interface LearnResultRespone{
  errorCode:number;
  data:LearnResult;
  Message:string;
}
export interface LearnResult{
  id: number;
  className: string;
  studenId: number;
  avgscore: number;
  classId: number;
  firstName: string;
  lastName: string;
}
@Injectable({
  providedIn: 'root'
})
export class LearnresultService {

  constructor(private http:HttpClient, private api:ApiService) { }

  getall():Observable<LearnResultsRespone>{
    
    return this.http.get<LearnResultsRespone>(this.api.apiUrl.learnresult);
  }
}
