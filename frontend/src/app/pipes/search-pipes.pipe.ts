import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';
import { Employee } from '../Models/EmplyeeModel';

@Pipe({
  name: 'searchPipes'
})
export class SearchPipesPipe implements PipeTransform {

  transform(value: Employee[],searchvalue : string, ...args: unknown[]): Employee[] {

    if(!searchvalue) return value
    console.log(value);

    return value.filter((res:Employee) => {
      return res.name.toLowerCase().includes(searchvalue)
    })
    // return null;
  }

}
