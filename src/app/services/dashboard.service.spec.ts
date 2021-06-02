import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let dashboardService: DashboardService;
  let http:HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    dashboardService = new DashboardService(http);
  });

  // it('Get Clinician Data', () => {
  //   spyOn(dashboardService, 'getClinicians').and.callThrough();
  //   const data = dashboardService.getClinicians();
  //   expect(data.length).toBeGreaterThanOrEqual(1);
  // });
});
