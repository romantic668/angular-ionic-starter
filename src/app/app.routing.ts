/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard.page';
import { NotFoundPage } from './pages/not-found.page';

export const routes: Routes = [
  { path: '', component: DashboardPage, pathMatch: 'full' },
//  { path: 'lazy', loadChildren: './pages/lazy/index#LazyModule' },
//  { path: 'sync', loadChildren: './pages/sync/index#SyncModule?sync=true' },
  { path: '**', component: NotFoundPage }
];
