import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/app-settings';

const STORE_KEY = 'userLastAction';

@Injectable({ providedIn: 'root' })
export class IdleTimeoutService implements OnDestroy {
  public static runTimer: boolean;
  private userIdleTimeout: number;
  public userIdlePopupTime: number;

  public automaticLogoutTimeLeft: BehaviorSubject<string>;
  public showDialog: BehaviorSubject<boolean>;

  private sessionForIdle: Observable<number>;
  private userActivityChangeCallback: ($event) => void;
  private isPopUpOpen = false;

  constructor(private zone: NgZone) {
    this.userIdleTimeout = AppSettings.userIdleTimeout;
    this.userIdlePopupTime = AppSettings.userIdlePopupTime;
    if (!this.automaticLogoutTimeLeft) {
      this.automaticLogoutTimeLeft = new BehaviorSubject<string>('0');
    }

    if (!this.showDialog) {
      this.showDialog = new BehaviorSubject<boolean>(false);
    }
  }

  get lastAction(): number {
    return parseInt(localStorage.getItem(STORE_KEY), 10);
  }

  set lastAction(value) {
    localStorage.setItem(STORE_KEY, value.toString());
  }

  public initilizeSessionTimeout(): void {
    IdleTimeoutService.runTimer = true;
    this.reset();
    this.initListener();
    this.initInterval();
  }

  public initListener(): void {
    this.zone.runOutsideAngular(() => {
      this.userActivityChangeCallback = ($event) =>
        this.handleUserActiveState($event);
      window.document.addEventListener(
        'click',
        this.userActivityChangeCallback.bind(this),
        true
      );
      window.document.addEventListener(
        'keydown',
        this.userActivityChangeCallback.bind(this),
        true
      );
    });
  }

  private removeListeners(): void {
    this.zone.runOutsideAngular(() => {
      window.document.removeEventListener(
        'click',
        this.userActivityChangeCallback,
        true
      );
      window.document.removeEventListener(
        'keydown',
        this.userActivityChangeCallback,
        true
      );
    });
  }

  private handleUserActiveState(event): void {
    if (IdleTimeoutService.runTimer && !this.isPopUpOpen) {
      this.reset();
    }
  }

  public reset(): void {
    this.lastAction = Date.now();
    // hide dialog
    if (this.showDialog) {
      this.showDialog.next(false);
      this.isPopUpOpen = false;
    }
    if (this.automaticLogoutTimeLeft) {
      this.automaticLogoutTimeLeft.next('');
    }
  }

  private initInterval(): void {
    const intervalDuration = 1000;
    this.sessionForIdle = interval(intervalDuration).pipe(
      map((tick: number) => {
        return tick;
      }),
      takeWhile(() => IdleTimeoutService.runTimer)
    );

    this.tracker();
  }

  public convertMiliseconds(miliseconds: number, format: string): any {
    const totalSeconds = Math.floor(miliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;

    switch (format) {
      case 's':
        return totalSeconds;
      case 'm':
        return totalMinutes;
      default:
        return { m: minutes, s: seconds };
    }
  }

  public checkIdlePopupTime(idleTimeLeftInSec): boolean {
    return (
      idleTimeLeftInSec <= this.userIdlePopupTime && idleTimeLeftInSec >= 0
    );
  }

  private tracker(): void {
    this.sessionForIdle.subscribe(() => {
      const now = Date.now();
      const idleTargetTime = this.lastAction + this.userIdleTimeout * 1000;
      const timeLeftInMilliseconds = idleTargetTime - now;
      const idleTimeLeftInSec = this.convertMiliseconds(
        timeLeftInMilliseconds,
        's'
      );

      if (this.checkIdlePopupTime(idleTimeLeftInSec)) {
        // remove event listeners
        if (!this.isPopUpOpen) {
          this.removeListeners();
          this.showDialog.next(true);
        }
        this.isPopUpOpen = true;
        this.automaticLogoutTimeLeft.next(idleTimeLeftInSec);
      }
    });
  }

  public removeActionFromStore(): void {
    localStorage.removeItem(STORE_KEY);
  }

  public cleanUp(): void {
    IdleTimeoutService.runTimer = false;
    this.removeListeners();
  }

  ngOnDestroy(): void {
    IdleTimeoutService.runTimer = false;
    this.removeActionFromStore();
    if (this.automaticLogoutTimeLeft) {
      this.automaticLogoutTimeLeft.unsubscribe();
    }

    if (this.showDialog) {
      this.showDialog.unsubscribe();
    }
  }
}
