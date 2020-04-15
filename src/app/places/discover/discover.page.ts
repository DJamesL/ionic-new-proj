import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlacesService } from "../places.service";
import { Place } from "../places-data-model";
import { MenuController } from "@ionic/angular";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log("NGON init start");
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
    console.log(this.listedLoadedPlaces);
    console.log("NGON init end");
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
    console.log(this.listedLoadedPlaces);
    console.log("WILL ENTER");
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.authService.userId.subscribe(userId => {
      if (event.detail.value === "all") {
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      } else {
        this.relevantPlaces = this.loadedPlaces.filter(
          place => place.userId !== userId
        );
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      }
    });
    console.log(this.listedLoadedPlaces);
    console.log("onFilerEnd");
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
