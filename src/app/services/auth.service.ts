import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PatientLoginDTO } from '../models/Patient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private CONTROLLER = `${environment.apiBaseUrl}/Auth`;

  login(PatientLoginDTO: PatientLoginDTO) {
    return this._http.post(`${this.CONTROLLER}/login`, PatientLoginDTO);
  }

  verify() {
    return this._http.get(`${this.CONTROLLER}/verify`);
  }

  logout() {
    return this._http.get(`${this.CONTROLLER}/logout`);
  }
}
