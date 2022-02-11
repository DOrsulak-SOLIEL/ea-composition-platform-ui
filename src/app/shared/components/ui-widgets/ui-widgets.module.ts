import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {CollapsibleComponent} from "./collapsible/collapsible.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatPaginatorModule
    ],
  declarations: [
    AutocompleteComponent,
    CollapsibleComponent
  ],
  exports: [
    AutocompleteComponent,
    CollapsibleComponent
  ],
  providers: [],
  entryComponents: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Tells Angular we will have custom tags in our templates
  ]
})
export class UIWidgetsModule {
}
