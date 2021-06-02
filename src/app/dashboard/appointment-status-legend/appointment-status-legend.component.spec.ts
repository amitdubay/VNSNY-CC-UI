import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatusLegendComponent } from './appointment-status-legend.component';

describe('AppointmentStatusLegendComponent', () => {
  let component: AppointmentStatusLegendComponent;
  let fixture: ComponentFixture<AppointmentStatusLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentStatusLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentStatusLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
