import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

import { Tile } from '../models';

@Injectable()
export class TileService {
  tile: Observable<Tile[]>;
  updates: Subject<any> = new Subject<any>();
}