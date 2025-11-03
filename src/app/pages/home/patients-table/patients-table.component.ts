import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { PatientDTO, PatientTableDTO } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css'],
})
export class PatientsTableComponent implements OnInit {
  private readonly _patientService = inject(PatientService);
  private readonly _confirm = inject(ConfirmationService);
  private readonly _router = inject(Router);
  private readonly _papa = inject(Papa);

  patients$: Observable<PatientTableDTO[]> = this._patientService.patients$;

  ngOnInit(): void {
    this._patientService.loadAll();
  }

  newPatient(): void {
    this._patientService.openModal();
  }

  editPatient(patient: PatientDTO): void {
    this._patientService.openModal(patient.id);
  }

  goToHistory(Patient: PatientTableDTO) {
    this._router.navigate([`home/${Patient.id}`]);
  }

  deletePatient(patient: PatientDTO): void {
    console.log('HOLA');
    this._confirm.confirm({
      message: `¿Eliminar a ${patient.firstName} ${patient.lastName}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this._patientService.delete(patient.id).subscribe({
          next: () => {
            // opcional: mostrar mensaje de éxito
          },
        });
      },
    });
  }

  exportCSV(): void {
    this.patients$
      .subscribe((patients) => {
        if (!patients || patients.length === 0) return;

        const csv = this._papa.unparse(
          patients.map((p) => ({
            TipoDocumento: p.documentType?.Name || '',
            Documento: p.document,
            Nombres: p.firstName,
            Apellidos: p.lastName,
            Telefono: p.phoneNumber || '',
            Email: p.email || '',
          }))
        );

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'pacientes.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .unsubscribe();
  }
}
