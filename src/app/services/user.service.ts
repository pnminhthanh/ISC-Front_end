import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface UsersResponse {
  errorCode: number;
  data: User[];
  message: string;
}
export interface UserResponse {
  errorCode: number;
  data: User;
  message: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  gender: number;
  dob: Date;
  identitynumber: string;
  email: string;
  phone: string;
  address: string;
  isStudent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.apiService.apiUrl.user);
  }

  getUser(id): Observable<UserResponse> {
    const url = `${this.apiService.apiUrl.user}/${id}`;
    return this.http.get<UserResponse>(url);
  }

  addUser(user: User): Observable<UserResponse> {
    console.log(user);
    return this.http.post<UserResponse>(this.apiService.apiUrl.user, JSON.stringify(user), this.httpOptions);
  }

  updateUser(user: User): Observable<UserResponse> {
    const url = `${this.apiService.apiUrl.academic}/${user.id}`;
    console.log(user);
    return this.http.put<UserResponse>(url, JSON.stringify(user), this.httpOptions);
  }

  deleteUser(id): Observable<UserResponse> {
    const url = `${this.apiService.apiUrl.user}/${id}`;
    return this.http.delete<UserResponse>(url, this.httpOptions);
  }
}
