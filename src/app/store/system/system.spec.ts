import { getTestBed, TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { Platform } from 'ionic-angular';
import { PlatformMock } from '../mocks';

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
              SystemEffects,
              {
                provide: Platform,
                useClass: PlatformMock
              }
            ]
        });
        testbed = getTestBed();
        store = testbed.get(Store);
    });

    function setup() {
      return {
        runner: TestBed.get(EffectsRunner),
        systemEffects: TestBed.get(SystemEffects),
        platform: TestBed.get(Platform)
      };
    }

    it('passes smoke test', () => {
        expect(store).toBeTruthy();
    });

    /*
    describe('- Effects', () => {

      it('initialization$ effect start and finish successfully', () => {
        const {runner, systemEffects, platform} = setup();

        runner.queue(new SystemActions.Initialize());
        systemEffects.initialize$.subscribe(result => {
          console.log(result);
          expect(result).toBeAnInstanceOf(new SystemActions.InitializeSuccess());
        });

      });


    });
    */

});
