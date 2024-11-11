import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressPipe'
})
export class AddressPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    if (!value) return '';
    // Format the address into a typical readable form
    return `${value.street} ${value.suite}${value.city}`;
  }
}
