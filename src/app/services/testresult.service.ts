import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface TestResultsResponse {
  errorCode: number;
  data: TestResult[];
  Message: string;
}
export interface TestResultResponse {
  errorCode: number;
  data: TestResult;
  Message: string;
}
export interface TestResult {
  id: number;
  subjectid: number;
  userid: number;
  entrancetestid: number;
  score: number;
  ispassing: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<TestResultsResponse> {
    return this.http.get<TestResultsResponse>(this.api.apiUrl.testresult);
  }
  get(id): Observable<TestResultResponse> {
    return this.http.get<TestResultResponse>(this.api.apiUrl.testresult + '/' + id);
  }
  add(data: TestResult): Observable<TestResultResponse> {
    return this.http.post<TestResultResponse>(this.api.apiUrl.testresult, data);
  }
  update(data: TestResult): Observable<TestResultResponse> {
    const url = `${this.api.apiUrl.testresult}/${data.id}`;
    return this.http.put<TestResultResponse>(url, data);
  }
  delete(id): Observable<TestResultResponse> {
    const url = `${this.api.apiUrl.testresult}/${id}`;
    return this.http.delete<TestResultResponse>(url);
  }
}
