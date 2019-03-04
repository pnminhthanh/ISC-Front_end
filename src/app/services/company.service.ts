import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

// dinh nghia class
export interface CompaniesResponse {
  data: Company[];
  errorCode: number;
  errorMessage: string;
}
export interface CompanyResponse {
  data: Company;
  errorCode: number;
  errorMessage: string;
}
export interface Company {
  companyid: number;
  companyname: string;
  diachi: string;
  contectperson: string;
  phone: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  constructor(private http: HttpClient, private api: ApiService) { }
  get(id): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(this.api.apiUrl.companies + '/' + id);
  }
  getAll(): Observable<CompaniesResponse> {
    return this.http.get<CompaniesResponse>(this.api.apiUrl.companies);
  }
  add(data: Company): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(this.api.apiUrl.companies, data);
  }
  update(data: Company): Observable<CompanyResponse> {
    // const url = this.api.apiUrl.major + '?id=' + data.id;
    const url = `${this.api.apiUrl.companies}/${data.companyid}`;
    return this.http.put<CompanyResponse>(url, data);
  }
  delete(companyid): Observable<CompanyResponse> {
    const url = `${this.api.apiUrl.companies}/${companyid}`;
    return this.http.delete<CompanyResponse>(url);
  }
}
