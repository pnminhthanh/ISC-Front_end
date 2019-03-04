import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Worktrack {
  id: number;
  companyid: number;
  idstudent: number;
  startdate: Date;
  contractdate: Date;
  status: number;
  note: string;
}
export interface WorktrackResponse {
  data: Worktrack;
  errorCode: number;
  errorMessage: string;
}
export interface WorktracksResponse {
  data: Worktrack[];
  errorCode: number;
  errorMessage: string;
}
@Injectable({
  providedIn: 'root'
})
export class WorktrackService {

  constructor(private api: ApiService, private http: HttpClient) { }
  getAll(): Observable<WorktracksResponse> {
    return this.http.get<WorktracksResponse>(this.api.apiUrl.worktracks);
  }
  get(id): Observable<WorktrackResponse> {
    return this.http.get<WorktrackResponse>(`${this.api.apiUrl.worktracks}/${id}`);
  }
  add(data: Worktrack): Observable<WorktrackResponse> {
    return this.http.post<WorktrackResponse>(this.api.apiUrl.worktracks, data);
  }
  update(data: Worktrack): Observable<WorktrackResponse> {
    const url = `${this.api.apiUrl.worktracks}/${data.id}`;
    return this.http.put<WorktrackResponse>(url, data);
  }
  delete(id): Observable<WorktrackResponse> {
    const url = `${this.api.apiUrl.worktracks}/${id}`;
    return this.http.delete<WorktrackResponse>(url);
  }
}
