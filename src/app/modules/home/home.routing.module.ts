import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {NoPageComponent} from "../404-page/404-page.component";
import {HomeComponent} from "./home.component";
import {EntityNetworkComponent} from "../research/entity-network/entity-network.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
