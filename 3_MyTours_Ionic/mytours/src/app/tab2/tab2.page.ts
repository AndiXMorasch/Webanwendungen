import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TripService } from '../services/trip.service';
import { Injectable } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [TripService],
})
@Injectable()
export class Tab2Page {
  @ViewChild(IonModal)
  modal!: IonModal;
  constructor(
    private tripService: TripService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  scopedTrip: any;
  name: any;

  public getCurrentDate() {
    var todaysDateTmp = new Date();
    return [
      todaysDateTmp.getFullYear(),
      this.padTo2Digits(todaysDateTmp.getMonth() + 1),
      this.padTo2Digits(todaysDateTmp.getDate()),
    ].join('-');
  }

  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  public getCurrentTripList() {
    return this.tripService.getTripListFromLocalStorage();
  }

  isModalModificationOpen = false;
  isModalCreationOpen = false;
  isModalInfoOpen = false;

  kuerzelForCreation = null;
  reisendeForCreation = null;
  reisezielForCreation = null;
  reiseantrittForCreation = null;
  reiseendeForCreation = null;
  gesamtpreisForCreation = null;

  setModificationOpenTrue(trip: any) {
    this.isModalModificationOpen = true;
    this.scopedTrip = trip;
  }

  setModificationOpenFalse() {
    this.isModalModificationOpen = false;
  }

  setCreationOpenTrue() {
    this.isModalCreationOpen = true;
  }

  setCreationOpenFalse() {
    this.isModalCreationOpen = false;
  }

  setInfoOpenTrue(trip: any) {
    this.isModalInfoOpen = true;
    this.scopedTrip = trip;
  }

  setInfoOpenFalse() {
    this.isModalInfoOpen = false;
  }

  confirmCreation() {
    this.setCreationOpenFalse();
    console.log(this.name);
    this.modal.dismiss(this.name, 'confirm');
  }

  async deleteTrip(trip: any) {
    var tripListTmp = this.tripService.getTripListFromLocalStorage();
    var kuerzel = trip.kuerzel;
    if (kuerzel) {
      tripListTmp.forEach(
        (trip: { kuerzel: string | null | undefined }, index: any) => {
          if (trip.kuerzel === kuerzel) {
            tripListTmp.splice(index, 1);
            this.tripService.saveTripListToLocalStorage(tripListTmp);
          }
        }
      );
    }
    const toast = await this.toastController.create({
      message: 'Die Reise ' + kuerzel + ' wurde erfolgreich gelöscht.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
