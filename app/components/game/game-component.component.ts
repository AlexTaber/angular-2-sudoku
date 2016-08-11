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

  checkKey(e: any): void {
    debugger;
    if(e.key == "Enter") this.solve();
  }

  solve(): void {
    this.gameService.solve(this.game);
    this.updateGame();
  }
}