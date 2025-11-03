import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditLog } from 'src/app/models/AuditLog';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private patientService = inject(PatientService);
  private datePipe = inject(DatePipe);

  patientChanges: AuditLog[] = [];
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientService.getChangesByPatientId(+id).subscribe({
        next: (data) => {
          this.patientChanges = data;
          this.loading = false;
        }
      });
    }
  }

  formatDate(dateStr: string): string {
    return this.datePipe.transform(dateStr, 'dd/MM/yyyy HH:mm:ss') || '';
  }
}
