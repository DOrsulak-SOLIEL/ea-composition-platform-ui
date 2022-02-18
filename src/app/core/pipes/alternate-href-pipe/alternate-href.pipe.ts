import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alternateHrefPipe',
  pure: true
})
export class AlternateHrefPipe implements PipeTransform {

  transform(url: string, alternateUrls: string[]): any {
    let hasMatch = false;
    if (alternateUrls) {
      alternateUrls.forEach((altUrl: string) => {
        if (url.indexOf(altUrl) !== -1) {
          hasMatch = true;
        }
      });
    }
    return hasMatch;
  }

}
