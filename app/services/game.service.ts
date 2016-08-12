import { Injectable } from '@angular/core';

import { Game, Tile } from '../models';

@Injectable()
export class GameService {
  gameString: string = '6-----8-3-4-7-----------------5-4-7-3--2-----1-6-------2-----5-----8-6------1----';
  solvedString: string;
  originalString: string;

  constructor() {
    this.originalString = this.gameString;
    this.solvedString = this.solve(this.getGame());
  }

  getGame(): Game {
    let tiles: Tile[] = [];
    let value: number;

    for(let i = 0; i < this.gameString.length; i++) {
      value = parseInt(this.gameString[i]) || 0;
      tiles.push(new Tile(value)); 
    }

    return new Game(tiles);
  }

  getSolvedGame(): Game {
    this.gameString = this.solvedString;
    return this.getGame();
  }

  solve(game: Game): string {
    return game.solve(0, this.originalString);
  }

  updateTile(tile: Tile, value: number, index: number) {
    this.gameString = this.gameString.substr(0, index) + String(value) + this.gameString.substr(index + 1);
  }

  importGame(gameString: string): Game {
    this.gameString = gameString;
    this.originalString = gameString;
    return this.getGame();
  }

  isWrong(tile: Tile, index: number): boolean {
    if(this.originalString[index] == "-" && tile.value != 0) {
      return this.gameString[index] != this.solvedString[index];
    }

    return false;
  }
}