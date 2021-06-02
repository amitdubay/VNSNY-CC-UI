import { TestBed } from '@angular/core/testing';

import { DataLastRefreshService } from './data-last-refresh.service';

describe('DataLastRefreshService', () => {
  let service: DataLastRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLastRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
