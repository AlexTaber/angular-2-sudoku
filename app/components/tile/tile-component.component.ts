import { Component, EventEmitter } from '@angular/core';

import { Tile } from '../../models';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'tile-component',
  templateUrl: 'app/components/tile/tile-component.component.html',
  inputs: [ 'tile', 'selected', 'index', 'gameService' ],
  outputs: [ 'onGameUpdate' ],
  providers: [ GameService ]
})

export class TileComponent {
  tile: Tile;
  selected: boolean;
  index: number;
  gameService: GameService;
  onGameUpdate: EventEmitter<Object>;

  constructor() { 
    this.onGameUpdate = new EventEmitter();
  }

  updateTile(e: any, tile: Tile): void {
    let value = parseInt(e.target.value.value);
    this.gameService.updateTile(tile, value, this.index);
    this.onGameUpdate.emit();
    e.preventDefault();
  }

  formatedValue(): string {
    return (this.tile.value == 0) ? '-' : String(this.tile.value);
  }
}