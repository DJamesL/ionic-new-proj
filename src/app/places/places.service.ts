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
      'https://new-hls.s3.amazonaws.com/hls/data/2489/website/general/bn/mobile_banner-1.jpg',
      20000,
      new Date('2020-02-23'),
      new Date('2030-03-05')
    ),
    new Place(
      'p2',
      'Solaire Resort and Casino',
      'It\' more fun in Solarire',
      'https://pix10.agoda.net/hotelImages/443/443319/443319_16011414340039132431.jpg?s=1024x768',
      120000,
      new Date('2020-02-13'),
      new Date('2024-03-15')
    ),
    new Place(
      'p3',
      'Manhattan Place',
      'The home that never sleeps',
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Manhattan_Place.jpg',
      30000,
      new Date('2020-01-23'),
      new Date('2023-03-25')
    )
  ];


  get places() {
    return [...this._places];
  }

  constructor() { }

  getPlace(id: string) {
    return { ...this._places.find(p => p.id === id) };
  }
}
