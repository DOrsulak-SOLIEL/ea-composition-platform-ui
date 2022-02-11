import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {
  EaTableColumn,
  EaTableOptions,
  EaTablePagingOptions,
  INavigationUIItemState
} from '../../../interfaces/common.interface';
import * as I from '../../../interfaces/common.interface';
import { AppUtilityService } from '../../../../core/services/utility.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup } from '@angular/forms';
import { SortDirection } from '@angular/material/sort/sort-direction';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ea-table',
  templateUrl: './ea-table.component.html',
  styleUrls: ['./ea-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EaTableComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  tableForm = new FormGroup({
    searchTerm: new FormControl('')
  });
  public tableDataSource: MatTableDataSource<any> = new MatTableDataSource();
  public displayedColumns: string[] = [];
  // expandedElement: any | null;
  actionOptions: INavigationUIItemState[] = [];
  isAllChecked = true;
  userTableHeight = '100%';
  isUserExpanded = false;
  isRetrievingData = true;
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) matSort!: MatSort;

  @Input() tableColumns!: EaTableColumn[];
  @Input() enableExpand = false;
  @Input() options: EaTableOptions = {};
  @Input() errMsg = '';
  @Input() rowHeightPx = 40; // suggested row height in px
  @Input() tableHeight = ''; // suggested table height in px
  @Input() expandable = false;
  @Input() tableData: any[] | undefined;
  @Input() isLoading = false;
  // This component loads after initialized to avoid unnecessary delays. Because of that the page may auto scroll when chart loads.
  // To mitigate this, place an html id tag on top of parent page and pass in element ref here
  @Input() scrollAfterLoad?: HTMLElement;
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() getActionTypes: EventEmitter<any> = new EventEmitter<any>();
  @Output() finishedLoading: EventEmitter<any> = new EventEmitter<any>();

  pageConfig = {
    paginationSizes: [10, 20, 50, 100],
    pageSize: 10,
    pageIndex: 1,
    startRecordIndex: 0,
    endRecordIndex: 0,
    totalRecordNumber: 0
  };

  constructor(private utilService: AppUtilityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isLoading) {
      this.isRetrievingData = true;
    }
    this.displayedColumns = this.tableColumns.map((tableColumn: EaTableColumn) => tableColumn.name);
    if (this.options?.pagingOptions) {
      this.pageConfig = {
        ...this.options.pagingOptions,
        pageSize: this.pageConfig.pageSize,
        paginationSizes: this.options.pagingOptions.paginationSizes || [10, 20, 50, 100],
        startRecordIndex: this.options.pagingOptions.pageIndex * this.pageConfig.pageSize -
          this.pageConfig.pageSize + 1,
        endRecordIndex: (this.options.pagingOptions.pageIndex - 1) * this.pageConfig.pageSize +
          (this.tableData && this.tableData.length || 0)
      };
    }
    this.tableForm.get('searchTerm')?.setValue(this.options.searchTerm);
    if (this.options.completeWithNoResults || this.errMsg) {
      this.tableDataSource.data.splice(0, this.tableDataSource.data.length);
      this.tableDataSource.paginator = this.matPaginator;
      this.isRetrievingData = false;
    }
    this.loadData();
  }

  ngOnInit(): void {
    this.userTableHeight = this.tableHeight;
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  loadData(): void {
    if (this.tableData && this.tableData.length && this.tableColumns && this.tableColumns.length && !this.isLoading) {
      this.options.completeWithNoResults = false;
      this.isRetrievingData = false;
      this.expandCollapseTable(true);
      this.setTableDataSource(this.tableData);
    } else if (this.errMsg || this.options.completeWithNoResults) {
      this.isRetrievingData = false;
    } else {
      this.tableDataSource.sort = this.matSort;
    }
    this.completed();
  }

  setTableDataSource(data: any): void {
    this.tableDataSource = new MatTableDataSource<any>(data);
    const matTable = document.getElementById('matTable');
    if (!this.options.hasServerSort) {
      this.sortTable({
        active: this.options.currentSortColumn || '',
        direction: this.options.currentSortDirection as SortDirection
      });
      this.tableDataSource.sort = this.matSort;
    }
    matTable?.scrollIntoView();
  }

  sortTable(sortParameters: Sort): void {
    if (!this.tableDataSource.sort) {
      this.tableDataSource.sort = this.matSort;
    }
    this.tableDataSource.sortingDataAccessor = (data, header) => {
      return header;
    };
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active)?.dataKey || '';
    if (this.options.hasServerSort) {
      this.isRetrievingData = true;
      this.sortAction.emit(sortParameters);
    } else {
      this.pageConfig.pageIndex = 1;
      // provide sorting function
      this.tableDataSource.sortingDataAccessor = (item, property) => {
        const obj = this.tableColumns.find(i => i.name === property);
        if (obj && (obj.type === 'date')) {
          if (obj.dateFormat === 'dmyt') {
            return new Date(this.utilService.convertDMYtoMDY(item[obj.dataKey]));
          } else {
            return new Date(item[obj.dataKey]);
          }
        } else if (obj) {
          // we remove non-numeric values for sorting to avoid material thinking string is a date
          return item[obj.dataKey]?.toLowerCase().replace(/\W/g, '') || '';
        } else {
          return item[property] || '';
        }
      };
    }
  }

  emitRowAction(event: any, row: any, actionItem: any, isHeader: boolean = false): void {
    /*    event.preventDefault();
        event.stopPropagation();*/
    const action: INavigationUIItemState = {
      href: actionItem.href,
      name: actionItem.name,
      icon: actionItem.icon,
      headerAction: isHeader,
    };
    if (actionItem.type === 'checkbox') {
      action.value = event.target.checked;
    } else {
      action.value = event.target.value || '';
    }
    this.rowAction.emit({row, action});
  }

  emitMenuAction(row: any, action: INavigationUIItemState): void {
    this.rowAction.emit({row, action});
    this.retrieveActionTypes(row, action);
  }

  // html function
  iconClasses(item: I.INavigationUIItemState | string): string {
    let itemCheck: INavigationUIItemState;
    if (item && typeof item === 'string') {
      itemCheck = {
        name: 'icon',
        type: 'icon',
        icon: item
      };
    } else {
      itemCheck = item as INavigationUIItemState;
    }
    return this.utilService.iconClasses(itemCheck, false);
  }

  pagingChange(event: PageEvent): void {
    event.pageIndex = event.pageIndex + 1; // add 1 since out page index is not 0 based
    this.pageConfig.pageSize = event.pageSize || 10;
    this.pageAction.emit(event);
    this.isRetrievingData = true;
  }

  retrieveActionTypes(row: any, action: INavigationUIItemState): any {
    if (!action.retrieveChildrenFromParent && action.childItems?.length) {
      this.actionOptions = action.childItems;
    } else {
      this.actionOptions = [];
      return this.getActionTypes.emit({
        row,
        callback: (result: INavigationUIItemState[]): any[] => {
          this.actionOptions = result;
          return result;
        }
      });
    }
  }

  columnCheckboxChange($event: any, column: EaTableColumn): void {
    column.hideColumn = !$event.checked;
    this.isAllChecked = !this.tableColumns.find(item => item.hideColumn === true);
  }

  setAllCheckboxes(isShowAll: boolean): void {
    this.isAllChecked = isShowAll;
    this.tableColumns.forEach(t => t.hideColumn = !isShowAll);
  }

  expandCollapseTable(isMin?: boolean): void {
    if (this.isUserExpanded || isMin) {
      this.isUserExpanded = false;
      this.userTableHeight = this.tableHeight;
    } else if (!this.isUserExpanded) {
      this.isUserExpanded = true;
      // really doesnt matter what the number is here as long as its longer than the table would take up when expanded.
      // The component will not show any empty space if we over estimate.
      this.userTableHeight = '100000px';
    }
  }

  exportAsExcel(): any {
    const workSheet = XLSX.utils.json_to_sheet(this.tableDataSource.filteredData);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'EA_App_Download_Results.xlsx');
  }

  onSubmit(): void {
    this.filterAction.emit(this.tableForm.value.searchTerm);
    this.isRetrievingData = true;
  }

  identify(index: number, item: EaTableColumn): string {
    return item.name;
  }

  identifyOptions(index: number, item: INavigationUIItemState): string {
    return item.name;
  }

  /*  scrollbarVisible(): boolean {
      const scrollBox = document.getElementById('scrollBox');
      let isVisible = false;
      if (scrollBox) {
        isVisible = scrollBox.scrollHeight > scrollBox.clientHeight;
      }
      return isVisible;
    }*/

  completed(): void {
    if (this.scrollAfterLoad) {
      this.scrollAfterLoad.scrollIntoView();
    }
  }
}

