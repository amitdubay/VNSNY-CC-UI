import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentListviewComponent } from './patient-appointment-listview.component';

describe('PatientAppointmentListviewComponent', () => {
  let component: PatientAppointmentListviewComponent;
  let fixture: ComponentFixture<PatientAppointmentListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppointmentListviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
