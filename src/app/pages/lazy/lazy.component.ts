import { Component } from '@angular/core';

@Component({
  selector: 'my-lazy',
  template: `
    <header>
      <h5>
        This module is being loaded lazily.
      </h5>
    </header>  
  `
})

export class LazyComponent {}
