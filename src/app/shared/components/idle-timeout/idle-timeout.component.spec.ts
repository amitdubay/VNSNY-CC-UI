import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppSettings } from 'src/app/common/app-settings';
import { IdleTimeoutService } from '../../services/idle-timeout.service';
import { IdleTimeoutDialogComponent } from '../idle-timeout-dialog/idle-timeout-dialog.component';

import { IdleTimeoutComponent } from './idle-timeout.component';

const router = {
  navigate: jasmine.createSpy('navigate'),
};
let titleService: Title;
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open(): any {
    return {
      afterClosed: () => of({ action: true }),
    };
  }
}

describe('IdleTimeoutComponent', () => {
  let component: IdleTimeoutComponent;
  let idleService: IdleTimeoutService;
  let fixture: ComponentFixture<IdleTimeoutComponent>;
  let dialog: any;
  const data = { min: 0, sec: 59 };
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    // afterClosed: of({}),
    componentInstance: {
      data,
      // onContinue: of({}),
    },
    close: null,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdleTimeoutComponent, IdleTimeoutDialogComponent],
      providers: [
        { provide: MatDialog, useValue: new MatDialogMock() },
        { provide: Router, useValue: router },
        { provide: IdleTimeoutService },
        { provide: Title },
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
      ],
    }).compileComponents();
    titleService = TestBed.inject(Title);
    dialog = TestBed.inject(MatDialog);
    idleService = TestBed.inject(IdleTimeoutService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initTimer if userIdleTimeout is greater than ZERO on #ngOnInit', () => {
    spyOn(component, 'initTimer');

    AppSettings.userIdleTimeout = 100;
    component.ngOnInit();

    expect(component.initTimer).toHaveBeenCalled();
  });

  it('should not call initTimer if userIdleTimeout is equal ZERO on #ngOnInit', () => {
    spyOn(component, 'initTimer');

    AppSettings.userIdleTimeout = 0;
    component.ngOnInit();

    expect(component.initTimer).not.toHaveBeenCalled();
  });

  it('should continue the session', () => {
    spyOn(component, 'continueSession').and.callThrough();
    spyOn(component, 'resetPageTitle');

    component.continueSession();

    expect(component.isTimeoutDialogOpen).toBeFalse();
    expect(component.resetPageTitle).toHaveBeenCalled();
  });

  it('should logout user', () => {
    spyOn(component, 'idleTimeout').and.callThrough();
    spyOn(component, 'resetPageTitle');

    component.idleTimeout();

    expect(component.isTimeoutDialogOpen).toBeFalse();
    expect(component.resetPageTitle).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should idleTimeout when timer has reached zero', () => {
    spyOn(component, 'idleTimeout');

    component.onTimeTick(0);

    expect(component.idleTimeout).toHaveBeenCalled();
  });

  it('#onTimeTick should call updatePageTitle when #timeLeftInSec is greater than 0', () => {
    spyOn(component, 'updatePageTitle');
    component.dialogRef = dialogRefSpyObj;
    component.isTimeoutDialogOpen = true;
    component.onTimeTick(10);

    expect(component.updatePageTitle).toHaveBeenCalledWith('0', '10');
  });

  it('should update the page title', () => {
    const minutes = '10';
    const seconds = '30';
    const value = `Timeout in 10:30`;
    spyOn(titleService, 'setTitle');

    component.updatePageTitle(minutes, seconds);

    expect(titleService.setTitle).toHaveBeenCalledWith(value);
  });

  it('should reset the page title', () => {
    component.originalPageTitle = 'Original Title';
    spyOn(titleService, 'setTitle');

    component.resetPageTitle();

    expect(titleService.setTitle).toHaveBeenCalledWith('Original Title');
  });

  xit('should open dialog when isTimeoutDialogOpen is falsy', () => {
    component.isTimeoutDialogOpen = false;
    spyOn(component.isTimeoutDialogOpen, 'valueOf');

    component.openTimeoutDialog();

    expect(component.isTimeoutDialogOpen).toBeTruthy();
  });

  xit('should open dialog when isTimeoutDialogOpen is falsy', () => {
    component.isTimeoutDialogOpen = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.maxHeight = '100%';
    dialogConfig.width = '540px';
    dialogConfig.maxWidth = '100%';
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;

    // const ref = component.matDialog.open(
    //   IdleTimeoutDialogComponent,
    //   dialogConfig
    // );
    // spyOn(component.matDialog, 'open');

    component.openTimeoutDialog();

    expect(component.matDialog.open).toHaveBeenCalled();
    expect(component.isTimeoutDialogOpen).toBeTruthy();
  });

  it('Should close dialog on calling #idleTimeout()', () => {
    component.dialogRef = dialogRefSpyObj;
    component.idleTimeout();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
