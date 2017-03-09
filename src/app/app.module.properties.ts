import { APP_BASE_HREF } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './app.routing';

import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreDevToolsModule } from './components/store-devtools/store-devtools.module';

import { rootReducer } from './store/reducers';
import { UserEffects } from './store/user/user.effects';
import { UserActions } from './store/user/user.actions';

import { DashboardPage } from './pages/dashboard.page';
import { NotFoundPage } from './pages/not-found.page';



export const APP_DECLARATIONS = [
  DashboardPage,
  NotFoundPage
];

export const APP_ENTRY_COMPONENTS = [

];

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  ReactiveFormsModule,
  IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule
];

export const APP_PROVIDERS = [
  UserActions,
  {provide: APP_BASE_HREF, useValue : '/' }
];


