import { GlobalConstants } from 'src/app/common/global-contants';
import { LastSyncTimePipe } from './last-sync-time.pipe';

describe('LastSyncTimePipe', () => {
  it('create an instance', () => {
    const pipe = new LastSyncTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return difference in minutes', () => {
    const pipe = new LastSyncTimePipe();
    let now = new Date();
    now = new Date(now.setMinutes(now.getMinutes() - 3));
    const expectedResult = pipe.transform(now);
    expect(expectedResult).toContain(GlobalConstants.lastSyncCaseOneText);
  });

  it('should return difference in hours', () => {
    const pipe = new LastSyncTimePipe();
    let now = new Date();
    now = new Date(now.setHours(now.getHours() - 3));
    const expectedResult = pipe.transform(now);
    expect(expectedResult).toContain(GlobalConstants.lastSyncCaseTwoText);
  });

  it('should return difference in days', () => {
    const pipe = new LastSyncTimePipe();
    let now = new Date();
    now = new Date(now.setHours(now.getHours() - 180));
    const expectedResult = pipe.transform(now);
    expect(expectedResult).toContain(GlobalConstants.lastSyncCaseThreeText);
  });
});
