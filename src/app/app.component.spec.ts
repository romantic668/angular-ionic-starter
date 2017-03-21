/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import {
  APP_DECLARATIONS,
  APP_ENTRY_COMPONENTS,
  APP_IMPORTS,
  APP_PROVIDERS
} from './app.module.properties';

import { AppComponent } from './app.component';

import 'rxjs/add/operator/takeUntil';

/*
describe('App component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [APP_DECLARATIONS],
      imports: [APP_IMPORTS],
      providers: [APP_PROVIDERS]
    });
  });

  it('should pass the smoke test', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  }));

  it('displays Store Dev Tools module in development', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const instance = fixture.componentInstance;

    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  }));

});
*/
