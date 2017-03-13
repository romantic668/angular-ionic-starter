import { APP_BASE_HREF } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { RouterStoreModule } from '@ngrx/router-store';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreDevToolsModule } from './components/store-devtools/store-devtools.module';

import { rootReducer } from './store/root.reducer';
import { SystemEffects } from './store/system';

import { DashboardPage } from './pages/dashboard.page';
import { AboutPage } from './pages/about.page';
import { NotFoundPage } from './pages/not-found.page';

import { HeaderComponent } from './components/layout/header.component';
import { MenuComponent } from './components/layout/menu.component';

export const APP_DECLARATIONS = [
  DashboardPage,
  AboutPage,
  NotFoundPage,

  HeaderComponent,
  MenuComponent
];

export const APP_ENTRY_COMPONENTS = [

];

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  (['monitor', 'both'].indexOf(STORE_DEV_TOOLS)>-1) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  ReactiveFormsModule,
  IdlePreloadModule.forRoot(),
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
  EffectsModule.run(SystemEffects),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule
];

export const APP_PROVIDERS = [
  {provide: APP_BASE_HREF, useValue : '/' }
];


