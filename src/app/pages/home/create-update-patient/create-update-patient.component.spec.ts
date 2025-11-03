import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePatientComponent } from './create-update-patient.component';

describe('CreateUpdatePatientComponent', () => {
  let component: CreateUpdatePatientComponent;
  let fixture: ComponentFixture<CreateUpdatePatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdatePatientComponent]
    });
    fixture = TestBed.createComponent(CreateUpdatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
