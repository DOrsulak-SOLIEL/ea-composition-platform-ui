import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncateUsernamePipe',
  pure: true
})
export class TruncateUsernamePipe implements PipeTransform {

  transform(firstname: string, lastname: string): any {
    let name = '';
    if (firstname && firstname.length >= 7) {
      name = firstname[0].toUpperCase() + '.';
    } else {
      name = firstname;
    }
    if (lastname && lastname.length >= 12) {
      if (name && name[name.length - 1] === '.') {
        name = name + lastname[0].toUpperCase() + '.';
      } else {
        name = name + ' ' + lastname[0].toUpperCase() + '.';
      }
    } else {
      name = name + ' ' + lastname;
    }
    return name;
  }
}
