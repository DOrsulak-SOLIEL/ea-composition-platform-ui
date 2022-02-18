import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  forwardRef
} from '@angular/core';

import {autocompleteDisplayType} from '../../../common/constants';
import {IDropdownEntityState} from "../../../interfaces/common.interface";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {
  @Input() choicesArray: IDropdownEntityState[] = []; // array of options for dropdown
  @Input() selected?: any = null; // currently selected choice to bind value to
  @Input() primaryKey: keyof IDropdownEntityState = 'code'; // property name to locate selected item in choicesArray (ex. id, code, etc)
  @Input() bindLabel = 'code';
  @ContentChild(TemplateRef) templateRef: any;
  @Input() placeholderText = '';
  @Input() disabled = false;
  @Input() useBuffer = false;
  @Input() multiple = false;
  @Input() removeEmpty = false;
  @Input() hasError = false; // cannot use form-control on custom component, must pass in validation state.
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

  selectedValue: IDropdownEntityState[] | null = null;
  choices: IDropdownEntityState[] = [];
  filteredChoicesNum = 0;
  choicesLoaded: IDropdownEntityState[] = [];
  placeHolder = '';
  bufferSize = 300;
  numberOfItemsFromEndBeforeFetchingMore = 100;
  loading = false;
  isDisabled = false;

  constructor() {
    if (this.disabled) {
      this.isDisabled = true;
    }
  }

  ngOnDestroy(): void {
    this.reset();
  }

  ngOnInit(): void {
    this.normalizeData();
    this.setPlaceholder();
  }

  ngOnChanges(): void {
    this.reset();
    this.normalizeData();
    this.setPlaceholder();
  }

  onChange(event: any): void {
    this.setPlaceholder();
    this.selectedChange.emit(event);
  }

  unselectAll(): void {
    this.reset();
  }

  // make sure all array members have label field
  normalizeData(): void {
    const bindingLabel = this.bindLabel || 'id';
    if (!this.choices?.length && this.choicesArray && this.choicesArray?.length > 0) {
      this.choices = this.choicesArray.map((item: any) => {
        if (!item.label) {
          item.label = this.bindLabel.includes(' - ') ?
            bindingLabel.split(' - ').map(part => `${item[part]}`).join(' - ') : `${item[bindingLabel]}`;
          return item;
        }
        return item;
      });
    }
    this.loadArray();
  }

  loadArray(): void {
    // Add empty item in case user needs to unselect choice
    const emptySelect: IDropdownEntityState = {
      code: '',
      description: '',
      label: 'Select Option',
      selected: false,
      entityDescription: null,
      id: ''
    };
    if (!this.choices || (this.choices.length > 0 && this.choices[0][this.primaryKey]) && !this.removeEmpty) {
      this.choices.unshift(emptySelect);
    }
    this.useBuffer ? this.choicesLoaded = this.choices.slice(0, this.bufferSize) :
      this.choicesLoaded = this.choices;
    this.filteredChoicesNum = this.choices.length;
    if (this.filteredChoicesNum > 0) {
      this.isDisabled = false;
    }

  }

  setPlaceholder(): void {
    // sometimes the passed in selected value can be default option (empty). We identify this as empty if primary key is false
    if (((!this.selectedValue || (this.selectedValue[0] && !this.selectedValue[0][this.primaryKey])) && !this.selected) ||
      this.selected && ((Array.isArray(this.selected) && this.selected?.length >= 1 && !this.selected[0][this.primaryKey]) ||
        (typeof this.selected === 'object' && !this.selected[this.primaryKey]))) {
      this.selectedValue = null;
      this.placeHolder = this.placeholderText;
    } else {
      this.placeHolder = '';
      this.selectedValue = this.multiple ? (Array.isArray(this.selected) ? this.selected : [this.selected]) : this.selected;
    }
  }

  onOpen(event: any): void {
    this.filteredChoicesNum = this.choices.length;
  }

  onSearch(event: { term: string; items: any[] }): void {
    this.filteredChoicesNum = event.items.length || 0;
  }

  onScrollToEnd(): void {
    this.fetchMore();
  }

  onScroll({end}: any): any {
    if (this.loading || this.choices.length <= this.choicesLoaded.length ||
      (this.filteredChoicesNum !== 0 && this.filteredChoicesNum !== this.choices.length)) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.choicesLoaded.length) {
      this.fetchMore();
    }
  }

  private fetchMore(): void {
    this.loading = true;
    let buffer = this.bufferSize;
    const len = this.choicesLoaded?.length;
    const amountLeft = this.choices.length - this.choicesLoaded.length;
    if (amountLeft < buffer) {
      buffer = amountLeft;
    }
    const more = this.choices.slice(len, buffer + len);
    this.choicesLoaded = this.choicesLoaded.concat(more);
    this.loading = false;
  }

  private reset(): void {
    this.selectedValue = null;
    this.choices = [];
    this.filteredChoicesNum = 0;
    this.choicesLoaded = [];
    this.placeHolder = '';
  }
}
