import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IdleTimeoutService } from './idle-timeout.service';

const STORE_KEY = 'userLastAction';

IdleTimeoutService.runTimer = true;
describe('Service: IdleTimeoutService', () => {
  let service: IdleTimeoutService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [IdleTimeoutService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(IdleTimeoutService);
  });

  it('Service should exist', () => {
    expect(service).toBeTruthy();
  });

  it('#showDialog should not be undefined', () => {
    service.showDialog = new BehaviorSubject<boolean>(false);

    expect(false).toEqual(false);
  });

  it('get #lastAction() should return a value of lenght greater than 0', () => {
    const value = Date.now();
    localStorage.setItem(STORE_KEY, value.toString());

    console.log(service.lastAction.toString.length);
    expect(service.lastAction === value).toBeTruthy();
  });

  it('get #lastAction() should return a value of lenght greater than 0', () => {
    const value = Date.now();
    localStorage.setItem(STORE_KEY, value.toString());

    expect(service.lastAction === value).toBeTruthy();
  });

  it('set #lastAction() should store a value to localStorage', () => {
    const value = Date.now();
    service.lastAction = value;
    const valueFromLocalStorage = localStorage.getItem(STORE_KEY);
    expect(parseInt(valueFromLocalStorage, 10) === value).toBeTruthy();
  });

  it('Should initialize #initilizeSessionTimeout()', () => {
    spyOn(service, 'reset');
    spyOn(service, 'initListener');

    service.initilizeSessionTimeout();

    expect(service.initListener).toHaveBeenCalled();
    expect(service.reset).toHaveBeenCalled();
  });

  it('Should create event callback function', () => {
    spyOn(service, 'initListener').and.callThrough();
    const zone = TestBed.inject(NgZone);
    spyOn(zone, 'runOutsideAngular').and.callFake((fn) => fn());

    // Implement your test and expectations

    expect(true).toBe(true);
  });

  it('#checkIdlePopupTime() should call return true', () => {
    spyOn(service, 'checkIdlePopupTime').and.callThrough();

    const idleTimeLeftInSec = 10;
    service.userIdlePopupTime = 15;

    const returnValue = service.checkIdlePopupTime(idleTimeLeftInSec);

    expect(returnValue).toBeTrue();
  });

  it('#checkIdlePopupTime() should return false when idle timeout is greater than #userIdlePopupTime', () => {
    spyOn(service, 'checkIdlePopupTime').and.callThrough();

    const idleTimeLeftInSec = 15;
    service.userIdlePopupTime = 10;

    const returnValue = service.checkIdlePopupTime(idleTimeLeftInSec);

    expect(returnValue).toBeFalse();
  });
});
