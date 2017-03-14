import { APP_BASE_HREF } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { IonicApp, IonicModule } from 'ionic-angular';

import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootReducer } from './store/root.reducer';
import { SystemEffects } from './store/system';

import { AppComponent } from './app.component';

import { DashboardPage } from './pages/dashboard.page';
import { AboutPage } from './pages/about.page';
import { NotFoundPage } from './pages/not-found.page';

import { HeaderComponent } from './components/layout/header.component';
import { MenuComponent } from './components/layout/menu.component';

export const APP_DECLARATIONS = [
  AppComponent,

  DashboardPage,
  AboutPage,
  NotFoundPage,

  HeaderComponent,
  MenuComponent
];

export const APP_ENTRY_COMPONENTS = [

];

export const APP_IMPORTS = [
  BrowserModule,
  HttpModule,
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  ReactiveFormsModule,
  IdlePreloadModule.forRoot(),
  StoreModule.provideStore(rootReducer),
  RouterStoreModule.connectRouter(),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  EffectsModule.run(SystemEffects),
  IonicModule.forRoot(AppComponent, { locationStrategy: 'path'})
];

export const APP_PROVIDERS = [
  {provide: APP_BASE_HREF, useValue : '/' }
];


