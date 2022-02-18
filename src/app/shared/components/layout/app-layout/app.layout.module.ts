import { AppLayoutComponent } from './app-layout.component';
import { DisaBannerComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationModule } from '../navigations/navigation.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AlertFOUOComponent} from "../../alert-fouo/alert-fouo.component";
import {ConfirmModalComponent} from "../../dialogs/confirm-dialog/confirm-dialog.modal.component";
import {UIWidgetsModule} from "../../ui-widgets/ui-widgets.module";
import {ThemeModule} from "../../../common/theme";

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    NavigationModule,
    CommonModule,
    UIWidgetsModule,
    ThemeModule
  ],
  entryComponents: [ConfirmModalComponent],
  declarations: [
    AppLayoutComponent,
    DisaBannerComponent,
    AlertFOUOComponent,
    ConfirmModalComponent
  ],
  providers: [],
  exports: [AppLayoutComponent, DisaBannerComponent, AlertFOUOComponent,
  ]
})
export class AppLayoutModule {}
