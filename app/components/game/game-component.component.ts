import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { Game, Tile } from '../../models';
import { TileComponent } from '../tile/tile-component.component';

@Component({
  selector: 'game-component',
  templateUrl: 'app/components/game/game-component.component.html',
  directives: [ TileComponent ],
  providers: [ GameService ]
})

export class GameComponent implements OnInit {
  game: Game;
  wrongTiles: Tile[] = [];
  selectedTile: Tile;

  constructor(
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.updateGame();
  }

  updateGame(): void {
    this.game = this.gameService.getGame();
  }

  isSelected(tile: Tile): boolean {
    return tile === this.selectedTile;
  }

  onSelect(tile: Tile): void {
    this.selectedTile = tile;
  }

  solve(): void {
    let oldGame: Game = this.game;
    this.gameService.solve(this.game);
    this.updateGame();
    this.findWrongTiles(oldGame, this.game);
  }

  findWrongTiles(oldGame: Game, newGame: Game): void {
    this.wrongTiles = [];
    let oldTile: Tile, newTile: Tile;
    
    for(let i = 0; i < newGame.tiles.length; i++) {
      oldTile = oldGame.tiles[i];
      if(oldTile.value != 0) {
        newTile = newGame.tiles[i];
        if(oldTile.value != newTile.value) { this.wrongTiles.push(newTile)}
      }
    }
  }

  isWrongTile(tile: Tile): boolean {
    return this.wrongTiles.includes(tile);
  }

  importForm(e: any): void {
    let gameString: string = e.target.gameString.value;
    this.game = this.gameService.importGame(gameString);
    e.preventDefault();
  }
}