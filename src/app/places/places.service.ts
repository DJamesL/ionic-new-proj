import { Injectable } from '@angular/core';
import { Place } from './places-data-model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Lewis Grand Hotel',
      'Biggest Hotel in Angeles City',
      '',
      20000
    ),
    new Place(
      'p2',
      'Solaire Resort and Casino',
      'It\' more fun in Solarire',
      '',
      120000
    ),
    new Place(
      'p3',
      'Manhattan Place',
      'The home that never sleeps',
      '',
      30000
    )
  ];
 

  get places(){
    return [...this._places];
  }

  constructor() { }
}
