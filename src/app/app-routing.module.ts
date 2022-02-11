import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoPageComponent } from "./modules/404-page/404-page.component";
import { AppLayoutComponent } from "./shared/components/layout/app-layout/app-layout.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { CanDeactivateGuard } from "./core/guards/diactivate.guard";
import { ConstructionComponentModule } from './shared/components/under-construction/construction.component.module';

const routes: Routes = [
  {
    path: '400',
    component: AppLayoutComponent,
    pathMatch: 'full',
    children: [
      {path: '', component: NoPageComponent}
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'research',
        loadChildren: () => import('../app/modules/research/research.module')
          .then(m => m.ResearchModule),
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('../app/modules/home/home.module')
          .then(m => m.HomeModule),
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
