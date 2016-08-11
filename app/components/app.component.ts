import { Component } from '@angular/core';
import { GameComponent } from './game/game-component.component'

@Component({
    selector: 'my-app',
    template: `
      <h1>Test App</h1>
      <game-component></game-component>
    `,
    directives: [GameComponent]
})
export class AppComponent { }
