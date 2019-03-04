import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRespone {
  errorCode: number;
  data: LoginInfo;
  errorMessage: string;
}
export interface LoginInfo {
  adminid: number;
  account: string;
  fullName: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // nhận thông tin từ server và trả về
  constructor(private api: ApiService, private http: HttpClient) { }
  login(username: string, password: string): Observable<LoginRespone> {
    const requestData = {
      username: username,
      password: password
    };
    return this.http.post<LoginRespone>(this.api.apiUrl.login, requestData);
  }
}
