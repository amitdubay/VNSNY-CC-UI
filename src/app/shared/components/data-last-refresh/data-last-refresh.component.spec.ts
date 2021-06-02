import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DataLastRefresh } from 'src/app/models/data-last-refresh.interface';
import { DataLastRefreshService } from '../../services/data-last-refresh.service';

import { DataLastRefreshComponent } from './data-last-refresh.component';

let DataLastRefreshServiceMock: Partial<DataLastRefreshService>;

DataLastRefreshServiceMock = {
  get(): Observable<DataLastRefresh> {
    return of({ dataLastRefreshTime: 10 });
  },
};

describe('DataLastRefreshComponent', () => {
  let component: DataLastRefreshComponent;
  let fixture: ComponentFixture<DataLastRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataLastRefreshComponent],
      providers: [
        {
          provide: DataLastRefreshService,
          useValue: DataLastRefreshServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLastRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe onDestroy', () => {
    spyOn(component.apiSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.apiSub.unsubscribe).toHaveBeenCalledTimes(1);
  });
});
