import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  PatientDTO,
  PatientRequestDTO,
  PatientTableDTO,
} from '../models/Patient';
import { AuditLog } from '../models/AuditLog';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private _http = inject(HttpClient);
  private CONTROLLER = `${environment.apiBaseUrl}/Patient`;

  private _patients$ = new BehaviorSubject<PatientTableDTO[]>([]);
  patients$ = this._patients$.asObservable();

  private _editPatient$ = new BehaviorSubject<PatientDTO | null>(null);
  editPatient$ = this._editPatient$.asObservable();

  private _isCreating = false;

  loadAll() {
    this._http.get<PatientTableDTO[]>(`${this.CONTROLLER}`).subscribe({
      next: (data) => this._patients$.next(data),
    });
  }

  refreshPatient(patientDTO: PatientDTO) {
    this._editPatient$.next(patientDTO);
  }

  delete(id: number) {
    return this._http
      .delete(`${this.CONTROLLER}/${id}`)
      .pipe(tap(() => this.loadAll()));
  }

  create(request: PatientRequestDTO): Observable<void> {
    return this._http
      .post<void>(this.CONTROLLER, request)
      .pipe(tap(() => this.loadAll()));
  }

  update(id: number, request: PatientRequestDTO): Observable<void> {
    return this._http
      .put<void>(`${this.CONTROLLER}/${id}`, request)
      .pipe(tap(() => this.loadAll()));
  }

  findById(id: number): Observable<PatientDTO> {
    return this._http.get<PatientDTO>(`${this.CONTROLLER}/${id}`);
  }

  openModal(patientId?: number): void {
    if (patientId && patientId > 0) {
      this._isCreating = false;
      this.findById(patientId).subscribe({
        next: (patient) => this._editPatient$.next(patient),
      });
    } else {
      // Crear paciente
      this._isCreating = true;
      this._editPatient$.next({} as PatientDTO); // enviamos objeto vacío solo para abrir modal
    }
  }

  closeModal(): void {
    this._editPatient$.next(null);
    this._isCreating = false;
  }

  getChangesByPatientId(id: number): Observable<AuditLog[]> {
    return this._http.get<AuditLog[]>(`${this.CONTROLLER}/${id}/history`);
  }
}
