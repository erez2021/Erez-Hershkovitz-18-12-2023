import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Actions } from 'src/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<{ measureSystem: string }>) {}
  title = 'weather-app';

  measureSystemChange(event: any) {
    this.store.dispatch(
      Actions.setMeasureSystem({ measureSystem: event.value })
    );
  }
}
