import { Injectable } from '@angular/core';

import { Game, Tile } from '../models';

@Injectable()
export class GameService {
  gameString: string = '6-----8-3-4-7-----------------5-4-7-3--2-----1-6-------2-----5-----8-6------1----';
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

  importGame(gameString: string): Game {
    this.gameString = gameString;
    this.originalString = gameString;
    return this.getGame();
  }
}