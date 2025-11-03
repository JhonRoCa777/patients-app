import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { MessageService } from 'primeng/api';
import { DocumentTypeDTO } from 'src/app/models/DocumentType';
import { PatientDTO, PatientRequestDTO } from 'src/app/models/Patient';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date > today ? { futureDate: true } : null;
  };
}

@Component({
  selector: 'app-create-update-patient',
  templateUrl: './create-update-patient.component.html',
})
export class CreateUpdatePatientComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  display = false;
  documentTypes: DocumentTypeDTO[] = [];
  selectedPatient: PatientDTO | null = null;

  private sub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private documnetTypeService: DocumentTypeService,
    private patientService: PatientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      documentTypeId: [null, [Validators.required]],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      firstName: ['', [Validators.required, Validators.maxLength(80)]],
      lastName: ['', [Validators.required, Validators.maxLength(80)]],
      birthDate: ['', [Validators.required, noFutureDateValidator()]],
      phoneNumber: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(120)]],
      rowVersion: [null],
    });

    this.documnetTypeService.getDocumentTypes().subscribe({
      next: (data) => (this.documentTypes = data),
    });

    this.sub = this.patientService.editPatient$.subscribe((patient) => {
      if (patient === null) {
        this.display = false;
        return;
      }

      if (Object.keys(patient).length === 0) {
        this.selectedPatient = null;
        this.form.reset();
      } else {
        this.selectedPatient = patient;
        this.form.patchValue({
          documentTypeId: patient.documentTypeId,
          document: patient.document,
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthDate: patient.birthDate,
          phoneNumber: patient.phoneNumber,
          email: patient.email,
          rowVersion: patient.rowVersion,
        });
      }

      this.display = true;
    });
  }

  private formatDateOnly(date: Date | string | null): string | null {
    if (!date) return null;

    const d = date instanceof Date ? date : new Date(date);
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    return `${y}-${m}-${day}`;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: PatientRequestDTO = {
      ...this.form.value,
      birthDate: this.formatDateOnly(this.form.value.birthDate),
    };

    const request$ = this.selectedPatient
      ? this.patientService.update(this.selectedPatient.id, payload)
      : this.patientService.create(payload);

    request$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.selectedPatient
            ? 'Paciente actualizado'
            : 'Paciente creado',
        });
        this.close();
      },
    });
  }

  close(): void {
    this.patientService.closeModal();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
