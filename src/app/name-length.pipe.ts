import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLength'
})
export class NameLengthPipe implements PipeTransform {

  transform(value: any, length: number,y:any): unknown {
    
    return value.slice(0,length);
     
  }

}
