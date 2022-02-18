import {NavigationComponent} from './navigation.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedPipesModule} from '../../../../core/pipes/shared-pipes.module';
import {TruncateUsernamePipe} from '../header/pipes/username/truncate-username.pipe';
import { ThemeModule } from '../../../common/theme';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SharedPipesModule,
        ThemeModule
    ],
  exports: [
    NavigationComponent,
    TruncateUsernamePipe
  ],
  declarations: [
    NavigationComponent,
    TruncateUsernamePipe
  ],
  providers: []
})
export class NavigationModule {
}
