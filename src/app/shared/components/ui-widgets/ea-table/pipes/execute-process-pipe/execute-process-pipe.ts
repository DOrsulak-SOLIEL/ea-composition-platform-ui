import {Pipe, PipeTransform} from '@angular/core';
import {AppUtilityService} from '../../../../../../core/services/utility.service';
import {EaTableColumn} from '../../../../../interfaces/common.interface';

@Pipe({
  name: 'executeProcessPipe',
  pure: true
})
export class ExecuteProcessPipe implements PipeTransform {
  constructor(private utilService: AppUtilityService) {
  }

  // this class takes object key and returns object name for column sorting
  transform(value: string, funct: string, column: EaTableColumn): any {
    return this.processFunction(value, funct, column);
  }

  processFunction(value: string, funct: string, column: EaTableColumn): string {
    switch (funct) {
      case 'dateFormat': {
        return this.utilService.dateFormat(value) || '';
      }
      case 'dateTimeFormat': {
        return this.utilService.dateTimeFormat(value, column.dateFormat) || '';
      }
      case 'phoneFormat': {
        return this.utilService.formatPhoneNumber(value) || '';
      }
      case 'directoryFileIcon': {
        if (value === 'DIRECTORY') {
          return 'fa-folder';
        }
        return 'fa-file';
      }
      default: {
        return value;
      }
    }
  }
}
