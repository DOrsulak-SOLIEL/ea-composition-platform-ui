import { AppStorageService } from '../../core/services/storage.service';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { UIWidgetsModule } from '../../shared/components/ui-widgets/ui-widgets.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { EaTableComponent } from '../../shared/components/ui-widgets/ea-table/ea-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EaTableModule } from '../../shared/components/ui-widgets/ea-table/ea-table.component.module';
import {HomeComponent} from "./home.component";
import {TestNetworkComponent} from "../test-bed/test-network.component";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    UIWidgetsModule,
    FormsModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    EaTableModule
  ],
  declarations: [HomeComponent, TestNetworkComponent
  ],
  entryComponents: [],
  providers: [],
  exports: [HomeComponent, TestNetworkComponent]
})
export class HomeModule {
}
