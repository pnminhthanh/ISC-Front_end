import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface SpecialiazedTraining {
  trainingId: number;
  name: string;
  numberweek: number;
}

export interface SpecialiazedTrainingsResponse {
  errorCode: number;
  message: string;
  data: SpecialiazedTraining[];
}

export interface SpecialiazedTrainingResponse {
  errorCode: number;
  message: string;
  data: SpecialiazedTraining;
}

@Injectable({
  providedIn: 'root'
})

export class SpecializedTrainingService {

  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<SpecialiazedTrainingsResponse> {
    const url = this.api.apiUrl.specializedtraining;
    return this.http.get<SpecialiazedTrainingsResponse>(url);
  }

  get(TrainingId): Observable<SpecialiazedTrainingResponse> {
    const url = this.api.apiUrl.specializedtraining + '/' + TrainingId;
    return this.http.get<SpecialiazedTrainingResponse>(url);
  }

  add(data: SpecialiazedTraining): Observable<SpecialiazedTrainingResponse> {
    const url = this.api.apiUrl.specializedtraining;
    return this.http.post<SpecialiazedTrainingResponse>(url, data);
  }

  update(data: SpecialiazedTraining, TrainingId): Observable<SpecialiazedTrainingResponse> {
    const url = this.api.apiUrl.specializedtraining + '/' + TrainingId;
    return this.http.put<SpecialiazedTrainingResponse>(url, data);
  }

  delete(TrainingId): Observable<SpecialiazedTrainingResponse> {
    const url = this.api.apiUrl.specializedtraining + '/' + TrainingId;
    return this.http.delete<SpecialiazedTrainingResponse>(url);
  }
}
