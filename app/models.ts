export class Game {
  tiles: Tile[];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }
}

export class Tile {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}