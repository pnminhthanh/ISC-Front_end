import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getLecturers(): Observable<any> {
    return this.http.get(this.endpoint + 'lecturers').pipe(
      map(this.extractData));
  }

  getLecturer(id): Observable<any> {
    return this.http.get(this.endpoint + 'lecturers/' + id).pipe(
      map(this.extractData));
  }

  addUser(user): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.endpoint + 'users', JSON.stringify(user), this.httpOptions).pipe(
// tslint:disable-next-line: no-shadowed-variable
      tap((user) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  addLecturer(lecturer): Observable<any> {
    console.log(lecturer);
    return this.http.post<any>(this.endpoint + 'lecturers', JSON.stringify(lecturer), this.httpOptions).pipe(
// tslint:disable-next-line: no-shadowed-variable
      tap((lecturer) => console.log(`added lecturer w/ id=${lecturer.id}`)),
      catchError(this.handleError<any>('addLecturer'))
    );
  }

  updateLecturer(id, product): Observable<any> {
    return this.http.put(this.endpoint + 'lecturers/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated lecturer id=${id}`)),
      catchError(this.handleError<any>('updateLecturer'))
    );
  }

  deleteLecturer(id): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'lecturers/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted lecturer id=${id}`)),
      catchError(this.handleError<any>('deleteLecturer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for lecturer consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
