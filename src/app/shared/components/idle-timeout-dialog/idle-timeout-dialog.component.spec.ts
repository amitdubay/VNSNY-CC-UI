import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { IdleTimeoutDialogComponent } from './idle-timeout-dialog.component';

describe('IdleTimeoutDialogComponent', () => {
  let component: IdleTimeoutDialogComponent;
  let fixture: ComponentFixture<IdleTimeoutDialogComponent>;
  let continueButtonEl: DebugElement;
  const data = { min: 0, sec: 59 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdleTimeoutDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleTimeoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking Continue button emits onContinue event', () => {
    spyOn(component, 'onSessionContinue');

    continueButtonEl = fixture.debugElement.query(
      By.css('button[name=continueButton]')
    );
    continueButtonEl.triggerEventHandler('click', null);

    expect(component.onSessionContinue).toHaveBeenCalled();
  });

  it('onSessionContiue should emit', () => {
    const emitSpy = spyOn(component.onContinue, 'emit');

    component.onSessionContinue();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});
