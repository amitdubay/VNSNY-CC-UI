import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { DataLastRefresh } from 'src/app/models/data-last-refresh.interface';

@Injectable({
  providedIn: 'root',
})
export class DataLastRefreshService {
  dataLastRefreshMock = [
    { dataLastRefreshTime: 3 },
    { dataLastRefreshTime: 16 },
    { dataLastRefreshTime: 25 },
    { dataLastRefreshTime: 32 },
  ];

  constructor() {}

  // Get data last refresh value in minutes from API
  get(): Observable<DataLastRefresh> {
    const randomValue = this.dataLastRefreshMock[
      Math.floor(Math.random() * this.dataLastRefreshMock.length)
    ];
    return of(randomValue);
  }
}
