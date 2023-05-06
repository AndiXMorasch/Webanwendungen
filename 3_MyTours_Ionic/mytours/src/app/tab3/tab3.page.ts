import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule],
  providers: [TripService],
})
export class Tab3Page {
  constructor(private tripService: TripService) {}

  public resetTripList() {
    this.tripService.resetLocalStorage();
  }
}
