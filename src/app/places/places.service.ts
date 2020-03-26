import { AuthService } from "./../auth/auth.service";
import { Injectable } from "@angular/core";
import { Place } from "./places-data-model";
import { BehaviorSubject } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "Lewis Grand Hotel",
      "Biggest Hotel in Angeles City",
      "https://new-hls.s3.amazonaws.com/hls/data/2489/website/general/bn/mobile_banner-1.jpg",
      20000,
      new Date("2020-02-23"),
      new Date("2030-03-05"),
      "admin"
    ),
    new Place(
      "p2",
      "Solaire Resort and Casino",
      "It' more fun in Solarire",
      "https://pix10.agoda.net/hotelImages/443/443319/443319_16011414340039132431.jpg?s=1024x768",
      120000,
      new Date("2020-02-13"),
      new Date("2024-03-15"),
      "admin"
    ),
    new Place(
      "p3",
      "Manhattan Place",
      "The home that never sleeps",
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Manhattan_Place.jpg",
      30000,
      new Date("2020-01-23"),
      new Date("2023-03-25"),
      "power-user"
    )
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Manhattan_Place.jpg",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this._places.pipe(take(1)).subscribe(places => {
      //pipe(take(1)) take 1 update then unsubscribe
      this._places.next(places.concat(newPlace));
    });
  }
}
