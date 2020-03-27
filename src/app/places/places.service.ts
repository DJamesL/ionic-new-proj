import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AuthService } from "./../auth/auth.service";
import { Injectable } from "@angular/core";
import { Place } from "./places-data-model";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";

interface placeDataFromServer {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}
@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]); //init an empty array

  // new Place(
  //   "p1",
  //   "Lewis Grand Hotel",
  //   "Biggest Hotel in Angeles City",
  //   "https://new-hls.s3.amazonaws.com/hls/data/2489/website/general/bn/mobile_banner-1.jpg",
  //   20000,
  //   new Date("2020-02-23"),
  //   new Date("2030-03-05"),
  //   "admin"
  // ),
  // new Place(
  //   "p2",
  //   "Solaire Resort and Casino",
  //   "It' more fun in Solarire",
  //   "https://pix10.agoda.net/hotelImages/443/443319/443319_16011414340039132431.jpg?s=1024x768",
  //   120000,
  //   new Date("2020-02-13"),
  //   new Date("2024-03-15"),
  //   "power-user"
  // ),
  // new Place(
  //   "p3",
  //   "Manhattan Place",
  //   "The home that never sleeps",
  //   "https://upload.wikimedia.org/wikipedia/commons/2/2f/Manhattan_Place.jpg",
  //   30000,
  //   new Date("2020-01-23"),
  //   new Date("2023-03-25"),
  //   "power-user"
  // )
  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: placeDataFromServer }>(
        "https://ionic-angular-tuts.firebaseio.com/offered-places.json"
      )
      .pipe(
        map(responseData => {
          const places = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  responseData[key].title,
                  responseData[key].description,
                  responseData[key].imageUrl,
                  responseData[key].price,
                  new Date(responseData[key].availableFrom),
                  new Date(responseData[key].availableTo),
                  responseData[key].userId
                )
              );
            }
          }
          return places;
          //return [];
        }),
        tap(places => {
          this._places.next(places);
        })
      );
    // .pipe(
    //   tap(resData => {
    //     console.log(resData);
    //   })
    // );
  }

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
    let generatedId: string; //local variable?
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
    return this.http
      .post<{ name: string }>(
        "https://ionic-angular-tuts.firebaseio.com/offered-places.json",
        {
          ...newPlace,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          //pipe(take(1)) take 1 update then unsubscribe
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this._places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(places => {
    //     //pipe(take(1)) take 1 update then unsubscribe
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-angular-tuts.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(resData => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
