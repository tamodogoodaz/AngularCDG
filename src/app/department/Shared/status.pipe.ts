import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/core/src/util';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  if ( status === 'Y' ){
      return status = 'Active';
  } else {
    return status = 'Deactive';
  }
 }

}
