import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {DataPropertyGetterPipe} from "./data-property-getter-pipe/data-property-getter.pipe";
import {AlternateHrefPipe} from "./alternate-href-pipe/alternate-href.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [DataPropertyGetterPipe, AlternateHrefPipe],
  exports: [DataPropertyGetterPipe, AlternateHrefPipe],
  providers: [],
  entryComponents: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedPipesModule {
}
