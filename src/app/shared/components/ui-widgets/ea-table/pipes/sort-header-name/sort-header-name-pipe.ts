import {Pipe, PipeTransform} from '@angular/core';
import {EaTableColumn} from '../../../../../interfaces/common.interface';

@Pipe({
  name: 'sortHeaderNamePipe',
  pure: true
})
export class SortHeaderNamePipe implements PipeTransform {

  // this class takes object key and returns object name for column sorting
  transform(key: string, columns: EaTableColumn[], args?: any): any {
    return this.getName(key, columns);
  }

  getName(key: string, tableColumns: EaTableColumn[]): string {
    let name = '';
    if (tableColumns && tableColumns.length) {
      name = tableColumns.find((x: EaTableColumn) => x.dataKey === key)?.name || '';
    }
    return name || '';
  }

}
