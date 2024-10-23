import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLength'
})
export class NameLengthPipe implements PipeTransform {

  transform(value: any, length: number,y:any): unknown {
    console.log(value,length,y);
    console.log(value.slice(0,length));
    return value.slice(0,length);
     
  }

}
