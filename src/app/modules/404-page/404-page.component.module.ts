import { AppLayoutComponent } from '../../shared/components/layout/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoPageComponent } from './404-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '404',
        component: AppLayoutComponent,
        children: [
          {path: '', component: NoPageComponent}
        ]
      }
    ])
  ],
  declarations: [NoPageComponent],
  providers: [],
  exports: [NoPageComponent]
})
export class NoPageModule {}
