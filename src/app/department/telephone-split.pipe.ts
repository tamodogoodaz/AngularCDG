import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephoneSplit'
})
export class TelephoneSplitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
