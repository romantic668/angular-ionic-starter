import { getTestBed, TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';

import {
  SystemState,
  SystemReducer,
  SystemEffects,
  SystemActions
} from './index';

describe('System store', () => {

    let testbed: TestBed;
    let store: Store<SystemState>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.provideStore({ SystemReducer }),
                EffectsTestingModule
            ],
            providers:[
              SystemEffects
            ]
        });
        testbed = getTestBed();
        store = testbed.get(Store);
    });

    it('passes smoke test', () => {
        expect(store).toBeTruthy();
    });

    describe('- Effects', () => {

      let runner: EffectsRunner;
      let systemEffects: SystemEffects;

      beforeEach(inject([
          EffectsRunner, SystemEffects
        ],
        (_runner, _systemEffects) => {
          runner = _runner;
          systemEffects = _systemEffects;
        }
      ));

      it('initialization$ effect start with SET_PLATFORM and returns SET_PLATFORM_SUCCESS', () => {
        runner.queue({ type: 'SET_PLATFORM' });
        systemEffects.initialize$.subscribe(result => {
          console.log('Selami abi?');
          console.log(result);
          expect(result).toEqual({ type: 'SET_PLATFORM_SUCCESS' });
          expect(result).not.toEqual({ type: 'SET_PLATFORM_FAIL' });
        });
      });

      it('initialization$ effect catches error and returns SET_PLATFORM_FAIL if something goes wrong', () => {

        spyOn(SystemActions, 'SetDimensions').and.returnValue(Promise.reject(''));

        runner.queue({ type: 'SET_PLATFORM' });
        systemEffects.initialize$.subscribe(result => {
          console.log('Korkan dayi basiin abi?');
          console.log(result);
          expect(result).not.toEqual({ type: 'SET_PLATFORM_SUCCESS' });
          expect(result).toEqual({ type: 'SET_PLATFORM_FAIL' });
        });
      });

    });

});
