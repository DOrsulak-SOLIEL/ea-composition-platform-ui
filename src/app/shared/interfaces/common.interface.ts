import { Component, Input } from '@angular/core';
import { SortDirection } from '@angular/material/sort';

export type predicate = () => boolean;

// export const truthy: predicate = () => true;
// export const falsy: predicate = () => false;
// export const noAction = () => {};
// export const identity = (x) => x;
// export const kestrel = (x) => (y) => x;
// export const apply = (f) => (x) => f(x);
export interface IModalMsgTypeState {
  type: 'open-dlg' | 'close-dlg' | 'save-close-dlg';
  compRef?: Component;
  model?: any;
}

export interface IKeyValueStringState {
  [propName: string]: string | null;
}

export interface IKeyValueStringStateStrict {
  [propName: string]: string;
}

export interface IGenericKeyArray {
  [key: string]: any[];
}

export interface IGeneric {
  [key: string]: any;
}

export interface IKeyValueBooleanState {
  [key: string]: boolean;
}

export interface IBasicActionableItemState {
  id: string;
  name: string;
}

export interface IReactiveFormStateValue {
  fieldValue: any;
  order?: number;
  visible?: boolean;
}

export interface IActionableUIItemState extends IBasicActionableItemState {
  //  id: string;
  authorizedAccess: number | string;
  href: string;
  enabled: predicate;
  existed: predicate;
  //    name: string;
  eventSink: (item: IActionableUIItemState) => void;
  selected?: boolean;
  tooltip?: string;
  icon?: string;
}

export interface IMainNavUIItemState {
  id: string;
  name: string;
  href: string;
  selected: boolean;
  userMenu: boolean;    // if true, display menu item under user icon
  icon: string;
  access: { [key: string]: string };
}

export interface INavigationUIItemState {
  href?: string;
  name: string;
  icon?: string;
  eventSink?: (item: IActionableUIItemState) => void;
  selected?: boolean;
  expanded?: boolean;
  tooltip?: string;
  color?: string;
  id?: string;
  parent?: INavigationUIItemState | null;
  childItems?: INavigationUIItemState[] | undefined | null;
  childItemsVisible?: boolean;
  homeless?: boolean;
  initalStateClosed?: boolean;
  alternateHref?: string[];  // used if multiple URLs should show nav as selected
  type?: string; // DT uses this to check if type === menu. If so it will implement action list and reference retrieveChildrenFromParent
  retrieveChildrenFromParent?: boolean; // DT uses this to check if action list should derived from parent function.
  disabled?: boolean;
  headerAction?: boolean; // DT sets this if action is derived from header
  value?: boolean | string;
}


export interface EaTableColumn {
  name: string; // column name
  dataKey: string; // name of key of the actual data in this column
  position?: 'right' | 'left' | 'center' | 'indent'; // should it be right-aligned or left-aligned?
  indent?: string; // pixels to offset
  isSortable?: boolean; // can a column be sorted?
  width?: string; // pixel width or percent , ex. 100px, 10%, etc.
  forcedWidth?: 'w-30' | 'w-40' | 'w-50' | 'w-60' | 'w-70' | 'w-100';
  style?: string;
  href?: string; // if field is link, this value should be its clicked value to send to parent
  icon?: string;
  options?: INavigationUIItemState[];
  childRows?: EaTableColumn[];
  bold?: boolean;
  prefix?: string;
  prefixBold?: boolean;
  postfix?: string;
  postfixBold?: boolean;
  wrapText?: boolean;
  tableFunction?: 'phoneFormat' | 'directoryFileIcon' | 'dateFormat' | 'dateTimeFormat' | undefined; // if you need to change the display value at runtime, this value will allow a function to be called in ea-table
  type?: 'date' | 'link' | 'linkButton' | 'icon' | 'arrayVerticalList' | 'checkbox' | 'textarea' | undefined; // if non standard type, like link button
  dateFormat?: 'dmyt' | undefined; // current date format... dmy = day/month/year Time, not needed if MDY format
  headerType?: 'checkbox' | undefined;
  arrayKey?: string; // if type === 'arrayVerticalList', use this string to access array value to use
  hideColumn?: boolean;
  overflowIndex?: number;
  disabled?: boolean;
  ifEmptyUse?: string; // If the value is empty/ null, use this string as alternative
  hidePrefixIfEmpty?: boolean; // If the value is empty, hide prefix
  hidePostfixIfEmpty?: boolean; // If the value is empty, hide prefix
  pureTextPrefix?: string; // no space/ no formatting/ no nothing
  pureTextPostfix?: string; // no space/ no formatting/ no nothing
  formControl?: string;
  disabledKey?: string;
  errorKey?: string;
  showHTML?: boolean;
}

export interface EaTableAction {
  row: any;
  action: INavigationUIItemState;
}

export interface EaTableOptions {
  isPageable?: boolean;
  isSortable?: boolean;
  isFilterable?: boolean;
  paginationSizes?: number[]; // items provide dropdown options
  pageSize?: number;
  pageIndex?: number;
  startRecordIndex?: number;
  endRecordIndex?: number;
  totalRecordNumber?: number;
  currentSortDirection?: SortDirection;
  currentSortColumn?: string;
  showToolbar?: boolean;
  hasServerSort?: boolean;
  completeWithNoResults?: boolean; // used to signal query completed with no results. Must be set in parent function on API response
  searchTerm?: string;
  pagingOptions?: EaTablePagingOptions;
  // Generally isLoading should not be used as ea-table will primarily take care of it internally.
  // This is handy if table is being refreshed from parent with new data
  isLoading?: boolean;
  noResultsMessage?: string;
}

export interface EaTablePagingOptions {
  pageIndex: number; // what page were on
  totalRecordNumber: number; // overall number of results
  paginationSizes?: number[]; // items provide dropdown options
  pageSize?: number; // This value is only for upstream. Does not impact EaTable
}

export interface IIconUIState {
  [propName: string]: boolean;
}

export interface IDropdownEntityState {
  selected?: boolean;
  id: number | string;
  code: string;
  description: string;
  value?: string | null;
  entityDescription?: string | null;
  label?: string;
  options?: any;
  filteredOptions?: any;
  action?: string;
}
