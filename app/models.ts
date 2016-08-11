export class Game {
  tiles: Tile[];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }

  solve(tileIndex: number, curString: string): string {
    console.log(curString);
    
    if (!curString.includes('-')) { return curString } //base case

    while(curString[tileIndex] != "-") { tileIndex += 1; } //find next empty cell
    let potentialAnswers: number[] = this.getPotentialAnswers(tileIndex, curString);

    console.log(potentialAnswers);

    if(potentialAnswers.length == 1) { curString = this.replaceAtIndex(curString, String(potentialAnswers[0]), tileIndex); }
    else if(potentialAnswers.length == 0) { return undefined }
    else if(potentialAnswers.length > 1) { return this.guess(tileIndex, potentialAnswers, curString); }

    return this.solve((tileIndex + 1) % 81, curString.repeat(1));
  }


  getPotentialAnswers(tileIndex: number, curString: string) {
    let possibleAnswers: number[] = [1,2,3,4,5,6,7,8,9];
    let takenNumbers: number[] = [];
    let returnedAnswers: number[] = [];

    takenNumbers = this.testRow(takenNumbers, tileIndex, curString);
    takenNumbers = this.testColumn(takenNumbers, tileIndex, curString);
    takenNumbers = this.testBox(takenNumbers, tileIndex, curString);

    for(let i = 0; i < possibleAnswers.length; i++) {
      if(!takenNumbers.includes(possibleAnswers[i])) {
        returnedAnswers.push(possibleAnswers[i]);
      }
    }

    return returnedAnswers;
  }

  guess(tileIndex: number, potentialAnswers: number[], curString: string): string {
    let solution: string;
    for(let i = 0; i < potentialAnswers.length; i++) {
      curString = this.replaceAtIndex(curString, String(potentialAnswers[i]), tileIndex);
      solution = this.solve((tileIndex + 1) % 81, curString.repeat(1));

      if(!solution) {
        if(i == potentialAnswers.length - 1) { return undefined }
      } else {
        return solution;
      }
    }
  }

  testRow(takenNumbers: number[], index: number, curString: string): number[] {
    let start = Math.floor(index / 9) * 9;
    let newNumbers = curString.substring(start, start + 9).replace(new RegExp('-', 'g'), '').split('').map(Number);
    return this.flattenArrays(takenNumbers, newNumbers);
  }

  testColumn(takenNumbers: number[], index: number, curString: string): number[] {
    let newNumbers: number[] = [];
    let start = index % 9;
    let addedNumber: number;

    for(let i = 0; i < 9; i++) {
      addedNumber= parseInt(curString[start]);
      if(addedNumber) { newNumbers.push(addedNumber); }
      start += 9;
    }
    
    return this.flattenArrays(takenNumbers, newNumbers);
  }

  testBox(takenNumbers: number[], index: number, curString: string): number[] {
    let newNumbers: number[] = [];
    let startColumn = Math.floor((index % 9) / 3);
    let startRow = Math.floor(Math.floor(index / 9) / 3);
    let start = (startRow * 27) + (startColumn * 3);
    let addedNumber: number;

    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        addedNumber = parseInt(curString[start + x + y*9]);
        if(addedNumber) { newNumbers.push(addedNumber); }
      }
    }

    return this.flattenArrays(takenNumbers, newNumbers);
  }

  flattenArrays(a: number[], b: number[]): number[] {
    return a.concat(b.filter((item) => { return a.indexOf(item) < 0 } ));
  }

  replaceAtIndex(str: string, subStr: string, index: number) {
    return str.substr(0, index) + subStr + str.substr(index + 1);
  }
}

export class Tile {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}