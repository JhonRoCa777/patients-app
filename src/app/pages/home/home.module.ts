import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientsTableComponent } from './patients-table/patients-table.component';
import { PatientComponent } from './patient/patient.component';
import { CreateUpdatePatientComponent } from './create-update-patient/create-update-patient.component';

@NgModule({
  declarations: [HomeComponent, PatientsTableComponent, PatientComponent, CreateUpdatePatientComponent],
  imports: [SharedModule, HomeRoutingModule],
  exports: [PatientsTableComponent],
})
export class HomeModule {}
