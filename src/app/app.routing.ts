/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard.page';
import { AboutPage } from './pages/about.page';
import { NotFoundPage } from './pages/not-found.page';

export const routes: Routes = [
  { path: '', component: DashboardPage, pathMatch: 'full' },
  { path: 'about', component: AboutPage },
  { path: '**', component: NotFoundPage }
];
