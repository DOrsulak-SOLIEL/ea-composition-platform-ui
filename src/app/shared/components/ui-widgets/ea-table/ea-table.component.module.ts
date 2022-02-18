import {CdkTableModule} from '@angular/cdk/table';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CanDeactivateGuard} from '../../../../core/guards/diactivate.guard';
import {EaTableComponent} from './ea-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {WaitingStatusModule} from '../../waiting-status/waiting-status.module';
import {MatCardModule} from '@angular/material/card';
import {NgbAlertModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SortHeaderNamePipe} from './pipes/sort-header-name/sort-header-name-pipe';
import {ExecuteProcessPipe} from './pipes/execute-process-pipe/execute-process-pipe';
import {UIWidgetsModule} from "../ui-widgets.module";
import {SharedPipesModule} from "../../../../core/pipes/shared-pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    WaitingStatusModule,
    MatCardModule,
    NgbAlertModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    UIWidgetsModule,
    NgbTooltipModule,
    SharedPipesModule
  ],
  declarations: [EaTableComponent, SortHeaderNamePipe, ExecuteProcessPipe],
  entryComponents: [],
  providers: [CanDeactivateGuard, SortHeaderNamePipe],
  exports: [EaTableComponent, SortHeaderNamePipe, ExecuteProcessPipe]
})
export class EaTableModule {
}
