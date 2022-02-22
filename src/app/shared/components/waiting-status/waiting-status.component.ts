import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-waiting-status',
  styles: ['.waiting-status {position: absolute; top: 55%; left: 40%; font-weight: bold;}'],
  template: `
    <div class="text-center">
      <div class="spinner-border" role="status" style="margin-top: 20px;">
        <span class="sr-only"></span>
      </div>
      <p>Please wait while retrieving data...</p>
    </div>`
})
export class WaitingStatusComponent {
  @Input('top') top: any;

  constructor() {
  }

  getStyles(): any {
    return {top: (!this.top ? 55 : this.top) + '%'};
  }
}
