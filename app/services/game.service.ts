import { Injectable } from '@angular/core';

import { Game, Tile } from '../models';

@Injectable()
export class GameService {
  
  getGameString(): string {
    return '---26-7-168--7--9-19---45--82-1---4---46-29---5---3-28--93---74-4--5--367-3-18---'
  }

  getGame(): Game {
    let gameString = this.getGameString();
    return this.createGame(gameString);
  }

  createGame(gameString: string): Game {
    let tiles: Tile[] = [];
    let value: number;

    for(let i = 0; i < gameString.length; i++) {
      value = parseInt(gameString[i]) || 0;
      tiles.push(new Tile(value)); 
    }

    return new Game(tiles);
  }
}