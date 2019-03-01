import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DegreesResponse {
  errorCode: number;
  data: Degree[];
  message: string;
}
export interface DegreeResponse {
  errorCode: number;
  data: Degree;
  message: string;
}

export interface Degree {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  getDegrees(): Observable<DegreesResponse> {
    return this.http.get<DegreesResponse>(this.endpoint + 'degrees');
  }

  getDegree(id): Observable<DegreeResponse> {
    return this.http.get<DegreeResponse>(this.endpoint + 'degrees/' + id);
  }

  addDegree(degree: Degree): Observable<DegreeResponse> {
    console.log(degree);
    return this.http.post<DegreeResponse>(this.endpoint + 'degrees', JSON.stringify(degree), this.httpOptions);
  }

  updateDegree(degree: Degree): Observable<DegreeResponse> {
    return this.http.put<DegreeResponse>(this.endpoint + 'degrees/' + degree.id, JSON.stringify(degree), this.httpOptions);
  }

  deleteDegree(id): Observable<DegreeResponse> {
    return this.http.delete<DegreeResponse>(this.endpoint + 'degrees/' + id, this.httpOptions);
  }
}
