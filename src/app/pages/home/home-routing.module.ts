import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: PatientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
