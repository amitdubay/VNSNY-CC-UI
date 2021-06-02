import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-contants';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(firstName: string, lastName: string): string {
    return (
      firstName.charAt(GlobalConstants.zero) +
      lastName.charAt(GlobalConstants.zero)
    );
  }
}
