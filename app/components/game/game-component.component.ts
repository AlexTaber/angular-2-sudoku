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
  showErrors: boolean = false;

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

  onSelect(e: any, tile: Tile): void {
    e.target.select();
    this.selectedTile = tile;
  }

  solve(): void {
    let oldGame = this.game;
    this.game = this.gameService.getSolvedGame();
  }

  isWrongTile(tile: Tile, index: number): boolean {
    return this.gameService.isWrong(tile, index);
  }

  importForm(e: any): void {
    let gameString: string = e.target.gameString.value;
    this.game = this.gameService.importGame(gameString);
    e.preventDefault();
  }

  checkShowError(tile: Tile, i: number): boolean {
    return this.showErrors && this.isWrongTile(tile, i);
  }

  toggleShowErrors(): void {
    this.showErrors = !this.showErrors;
  }

  showErrorsText(): string {
    let str = (this.showErrors) ? "Hide Errors" : "ShowErrors";
    return str;
  }
}