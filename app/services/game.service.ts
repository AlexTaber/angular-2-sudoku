import { Injectable } from '@angular/core';

import { Game, Tile } from '../models';

@Injectable()
export class GameService {
  gameString: string = '4-----8-5-3----------7------2-----6-----8-4------1-------6-3-7-5--2-----1-4------';
  originalString: string = this.gameString;

  getGame(): Game {
    let tiles: Tile[] = [];
    let value: number;

    for(let i = 0; i < this.gameString.length; i++) {
      value = parseInt(this.gameString[i]) || 0;
      tiles.push(new Tile(value)); 
    }

    return new Game(tiles);
  }

  solve(game: Game): void {
    this.gameString = game.solve(0, this.originalString);
  }

  updateTile(tile: Tile, value: number, index: number) {
    this.gameString = this.gameString.substr(0, index) + String(value) + this.gameString.substr(index + 1);
  }
}