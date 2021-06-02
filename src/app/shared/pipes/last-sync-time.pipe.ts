import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-contants';

@Pipe({
  name: 'lastSyncTime',
})
/**
 * Use this pipe to get time difference in Mins, Hours or Days bases on the configuration
 */
export class LastSyncTimePipe implements PipeTransform {
  transform(value: Date): string {
    const now: Date = new Date();
    let diffInMinutes =
      (now.getTime() - new Date(value).getTime()) /
      GlobalConstants.thousand /
      GlobalConstants.sixty;
    diffInMinutes = Math.round(diffInMinutes);
    if (diffInMinutes <= GlobalConstants.lastSyncCaseOne) {
      // difference in minutes
      return `${diffInMinutes} ${GlobalConstants.lastSyncCaseOneText}`;
    } else if (diffInMinutes <= GlobalConstants.lastSyncCaseTwo) {
      // difference in hours
      const hours = Math.round(diffInMinutes / GlobalConstants.sixty);
      return `${hours} ${GlobalConstants.lastSyncCaseTwoText}`;
    } else {
      // difference in days
      const days = Math.round(
        diffInMinutes / GlobalConstants.sixty / GlobalConstants.twentyFour
      );
      return `${days} ${GlobalConstants.lastSyncCaseThreeText}`;
    }
  }
}
