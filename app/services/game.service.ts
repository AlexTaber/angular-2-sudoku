import { Injectable } from '@angular/core';

import { Game, Tile } from '../models';

@Injectable()
export class GameService {
  gameString: string = '--5-3--819-285--6-6----4-5---74-283-34976---5--83--49-15--87--2-9----6---26-495-3';

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
    this.gameString = game.solve(0, this.gameString);
  }

  updateTile(tile: Tile, value: number, index: number) {
    this.gameString = this.gameString.substr(0, index) + String(value) + this.gameString.substr(index + 1);
  }
}