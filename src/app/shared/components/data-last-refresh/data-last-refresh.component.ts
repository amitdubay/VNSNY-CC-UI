import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/app-settings';
import { GlobalConstants } from 'src/app/common/global-contants';
import { DataLastRefresh } from 'src/app/models/data-last-refresh.interface';
import { DataLastRefreshService } from '../../services/data-last-refresh.service';

@Component({
  selector: 'app-data-last-refresh',
  templateUrl: './data-last-refresh.component.html',
  styleUrls: ['./data-last-refresh.component.css'],
})
export class DataLastRefreshComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dataLastRefresh: any;
  displayValue = '';
  dataLastRefreshColor = '';
  apiSub: Subscription;
  counterSub: Subscription;

  constructor(private dataLastRefreshService: DataLastRefreshService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.dataLastRefresh) {
      this.dataLastRefresh = Math.round(
        (Date.now() - this.dataLastRefresh) /
          GlobalConstants.thousand /
          GlobalConstants.sixty
      );
      this.displayValue = this.dataLastRefresh;
      this.startCounter();
    }
  }

  // Register get data last refresh call to make on interval of dataLastRefreshedFetchFrequency config value
  private getDataLastRefresh(): void {
    this.apiSub = interval(
      AppSettings.dataLastRefreshFetchFrequency *
        GlobalConstants.sixty *
        GlobalConstants.thousand
    )
      .pipe(
        startWith(GlobalConstants.zero),
        switchMap(() => this.dataLastRefreshService.get())
      )
      .subscribe((res: DataLastRefresh) => {
        this.dataLastRefresh = res.dataLastRefreshTime;
        this.setDataLastRefreshColor();
        this.startCounter();
      });
  }

  // start the counter to increment the value every minute between until next API call
  private startCounter(): void {
    this.counterSub = interval(
      GlobalConstants.sixty * GlobalConstants.thousand
    ).subscribe(() => {
      this.dataLastRefresh++;
      this.displayValue = this.dataLastRefresh;
      this.setDataLastRefreshColor();
    });
  }

  // Calculate and set CSS color value based on the conditions defined in dataLastRefreshColors config value
  public setDataLastRefreshColor(): void {
    AppSettings.dataLastRefreshColors.forEach((item) => {
      if (
        this.dataLastRefresh >= item.fromMinute &&
        this.dataLastRefresh <= item.toMinute
      ) {
        this.dataLastRefreshColor = item.color;
      }
    });
  }

  // destroy all the subscriptions
  ngOnDestroy(): void {
    if (this.apiSub) {
      this.apiSub.unsubscribe();
    }
    if (this.counterSub) {
      this.counterSub.unsubscribe();
    }
  }
}
