import {AppStorageService} from '../../core/services/storage.service';
import {CommonModule} from '@angular/common';
import {ResearchRoutingModule} from './research.routing.module';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {NgModule} from '@angular/core';
import {UIWidgetsModule} from '../../shared/components/ui-widgets/ui-widgets.module';
import {WaitingStatusModule} from '../../shared/components/waiting-status/waiting-status.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EaTableModule} from '../../shared/components/ui-widgets/ea-table/ea-table.component.module';
import {EntityNetworkComponent} from "./entity-network/entity-network.component";
import {EntityNetworkService} from "./entity-network/entity-network.service";
import {ThemeModule} from "../../shared/common/theme";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavigationModule} from "../../shared/components/layout/navigations/navigation.module";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
    imports: [
        CommonModule,
        ResearchRoutingModule,
        MatCardModule,
        UIWidgetsModule,
        WaitingStatusModule,
        FormsModule,
        MatGridListModule,
        MatTableModule,
        MatFormFieldModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        EaTableModule,
        ThemeModule,
        MatSidenavModule,
        NavigationModule,
        NgxGraphModule,
        MatSliderModule
    ],
  declarations: [
    EntityNetworkComponent,
  ],
  entryComponents: [],
  providers: [EntityNetworkService, AppStorageService],
  exports: [EntityNetworkComponent]
})
export class ResearchModule {
}
