import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter',
  pure: true
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): any {
    return object[keyName];
  }

}
