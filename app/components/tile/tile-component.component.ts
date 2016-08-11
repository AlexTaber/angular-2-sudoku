import { Component } from '@angular/core';

import { Tile } from '../../models';

@Component({
  selector: 'tile-component',
  templateUrl: 'app/components/tile/tile-component.component.html',
  inputs: [ 'tile', 'selected' ]
})

export class TileComponent {
  tile: Tile;
  selected: boolean;
}