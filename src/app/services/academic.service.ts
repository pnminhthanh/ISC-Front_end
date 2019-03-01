import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AcademicsResponse {
  errorCode: number;
  data: Academic[];
  message: string;
}
export interface AcademicResponse {
  errorCode: number;
  data: Academic;
  message: string;
}

export interface Academic {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  getAcademics(): Observable<AcademicsResponse> {
    return this.http.get<AcademicsResponse>(this.endpoint + 'academics');
  }

  getAcademic(id): Observable<AcademicResponse> {
    return this.http.get<AcademicResponse>(this.endpoint + 'academics/' + id);
  }

  addAcademic(academic: Academic): Observable<AcademicResponse> {
    console.log(academic);
    return this.http.post<AcademicResponse>(this.endpoint + 'academics', JSON.stringify(academic), this.httpOptions);
  }

  updateAcademic(academic: Academic): Observable<AcademicResponse> {
    return this.http.put<AcademicResponse>(this.endpoint + 'academics/' + academic.id, JSON.stringify(academic), this.httpOptions);
  }

  deleteAcademic(id): Observable<AcademicResponse> {
    return this.http.delete<AcademicResponse>(this.endpoint + 'academics/' + id, this.httpOptions);
  }
}
