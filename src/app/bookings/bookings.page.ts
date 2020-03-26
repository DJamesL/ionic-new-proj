import { BookingService } from "./booking.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Booking } from "./booking.modal";
import { IonItemSliding } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"]
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingsSub: Subscription;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    //this.loadedBookings = this.bookingService.bookings;
    this.bookingsSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    //cancel booking with id
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }
}
