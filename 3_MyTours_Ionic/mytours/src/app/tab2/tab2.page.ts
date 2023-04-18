import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TripService } from '../services/trip.service';
import { Injectable } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [TripService],
})
@Injectable()
export class Tab2Page {
  @ViewChild(IonModal)
  modal!: IonModal;
  constructor(
    private tripService: TripService,
    private modalCtrl: ModalController
  ) {}

  scopedTrip: any;
  tripList: any = this.tripService.getTripListFromLocalStorage();

  isModalModificationOpen = false;
  isModalCreationOpen = false;

  setModificationOpenTrue(trip: any) {
    this.isModalModificationOpen = true;
    this.scopedTrip = trip;
  }

  setModificationOpenFalse() {
    this.isModalModificationOpen = false;
  }

  getScopedTrip() {
    return JSON.stringify(this.scopedTrip.kuerzel);
  }

  setCreationOpenTrue() {
    this.isModalCreationOpen = true;
  }

  setCreationOpenFalse() {
    this.isModalCreationOpen = false;
  }

  deleteTrip() {}
}
