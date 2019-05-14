import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyDefault'
})
export class EmptyDefaultPipe implements PipeTransform {
  province = new Date('<NONE>');
  transform(value: string): string {
    return value ? value : '<NONE>';
  }

}
