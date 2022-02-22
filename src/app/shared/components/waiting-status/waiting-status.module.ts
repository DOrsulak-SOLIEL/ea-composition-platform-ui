import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WaitingStatusComponent } from './waiting-status.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    WaitingStatusComponent
  ],
  declarations: [
    WaitingStatusComponent
  ],
  providers: [],
  entryComponents: []
})
export class WaitingStatusModule {}
