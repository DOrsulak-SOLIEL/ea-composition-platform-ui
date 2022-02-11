import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {
  @Input() description: string | number = '';
  @Input() length: number | undefined;
  @Input() showHTML = false;
  // @Input() noWrap = false;
  defaultLength = 150;
  introText: number | string = '';
  remainderText: number | string = '';
  moreLess = 'more';
  showMore = false;

  constructor() {
  }

  ngOnInit(): void {
    this.createTextTemplate();
  }

  createTextTemplate(): void {
    const breakpoint = this.length || this.defaultLength;
    const descString = this.description?.toString() || '';
    // If description > 150 chars. then use show/hide template
    if (descString.length > 0) {
      if (descString.length <= breakpoint) {
        this.introText = descString;
      } else {
        this.introText = descString.substring(0, breakpoint) + '...';
        this.remainderText = descString.substring(breakpoint, descString.length - 1);
      }
    }
  }

  hasRemain(): boolean {
    const remString = this.remainderText?.toString() || '';
    if (remString && remString.length >= 1) {
      return true;
    }
    return false;
  }

  isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }


  toggleVisibilty(): void {
    this.showMore = !this.showMore;
    this.moreLess = !this.showMore ? 'more' : 'less';
  }
}
