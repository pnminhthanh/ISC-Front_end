import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsersResponse {
  errorCode: number;
  users: User[];
  errorMessage: string;
}
export interface UserResponse {
  errorCode: number;
  user: User;
  errorMessage: string;
}

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  gender: boolean;
  email: string;
  phone: string;
  identityNumber: string;
  DoB: Date;
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

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.endpoint + 'users');
  }

  getUser(id): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.endpoint + 'users/' + id);
  }

  addUser(user): Observable<UserResponse> {
    console.log(user);
    return this.http.post<UserResponse>(this.endpoint + 'users', JSON.stringify(user), this.httpOptions);
  }

  updateUser(user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.endpoint + 'users/' + user.id, JSON.stringify(user), this.httpOptions);
  }

  deleteUser(id): Observable<UserResponse> {
    return this.http.delete<UserResponse>(this.endpoint + 'users/' + id, this.httpOptions);
  }
}
