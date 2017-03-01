/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { IonicApp, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';

import { DashboardPage } from './pages/dashboard.page';
import { NotFoundPage } from './pages/not-found.page';

import { routes } from './app.routing';
import { StoreDevToolsModule } from './components/store-devtools/store-devtools.module';

import 'rxjs/add/operator/takeUntil';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        StoreDevToolsModule,
        IonicModule.forRoot(AppComponent, { locationStrategy: 'path'})
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      declarations: [AppComponent, DashboardPage, NotFoundPage]
    });
  });

  it('should pass the smoke test', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  }));

});
