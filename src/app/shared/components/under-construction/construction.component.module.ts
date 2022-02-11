import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../core/guards/diactivate.guard';
import { ConstructionComponent } from './construction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConstructionComponent
      }
    ])
  ],
  declarations: [ConstructionComponent],
  entryComponents: [],
  providers: [CanDeactivateGuard],
  exports: [ConstructionComponent]
})
export class ConstructionComponentModule {}
