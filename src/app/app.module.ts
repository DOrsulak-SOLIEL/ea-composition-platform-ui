import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxGraphModule} from "@swimlane/ngx-graph";
import { FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "./shared/ui/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppLayoutModule} from "./shared/components/layout/app-layout/app.layout.module";
import {NoPageModule} from "./modules/404-page/404-page.component.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {aquaDarkTheme, aquaLightTheme, darkTheme, lightTheme, ThemeModule, ThemesService} from "./shared/common/theme";
import {UIWidgetsModule} from "./shared/components/ui-widgets/ui-widgets.module";
import {NavigationService} from "./core/services/navigation.service";
import {AppStorageService} from "./core/services/storage.service";
import {AppUtilityService} from "./core/services/utility.service";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthGuard} from "./core/guards/auth.guard";
import {CanDeactivateGuard} from "./core/guards/diactivate.guard";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    NoPageModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxGraphModule,
    MaterialModule,
    HttpClientModule,
    FontAwesomeModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme, aquaLightTheme, aquaDarkTheme],
      active: 'standard-light'
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: MatDialogRef, useValue: {}},
    AppUtilityService,
    AppStorageService,
    NavigationService,
    ThemesService,
    UIWidgetsModule,
    AuthGuard,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
