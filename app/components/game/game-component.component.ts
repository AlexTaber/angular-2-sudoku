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
    this.game = this.gameService.getGame();
  }

  isSelected(tile: Tile): boolean {
    return tile === this.selectedTile;
  }

  onSelect(tile: Tile): void {
    this.selectedTile = tile;
  }
}