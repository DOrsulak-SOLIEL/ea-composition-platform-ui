import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { EntityNetworkComponent } from './entity-network/entity-network.component';
import { NoPageComponent } from '../404-page/404-page.component';

const routes: Routes = [
  {
    path: 'entity-network',
    component: EntityNetworkComponent
  },
  {
    path: '',
    redirectTo: 'entity-network',
  },
  {
    path: '**',
    redirectTo: '/404',
    component: NoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchRoutingModule {}
