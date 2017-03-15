import { getTestBed, TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

import {
  LayoutState,
  LayoutReducer,
  LayoutEffects,
  LayoutActions
} from './index';

describe('Layout store', () => {

    let testbed: TestBed;
    let store: Store<LayoutState>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.provideStore({ LayoutReducer }),
                EffectsTestingModule
            ],
            providers:[
              LayoutEffects
            ]
        });
        testbed = getTestBed();
        store = testbed.get(Store);
    });

    it('passes smoke test', () => {
        expect(store).toBeTruthy();
    });

});
