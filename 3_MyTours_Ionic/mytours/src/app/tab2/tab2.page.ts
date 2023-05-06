import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TripService } from '../services/trip.service';
import { Injectable } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [TripService, DatePipe],
})
@Injectable()
export class Tab2Page {
  @ViewChild(IonModal)
  modal!: IonModal;
  constructor(
    private tripService: TripService,
    private toastController: ToastController,
    private datePipe: DatePipe
  ) {}

  scopedTrip: any;
  scopedKuerzel: any;

  public getCurrentTripList() {
    return this.tripService.getCurrentTripList();
  }

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

  isModalModificationOpen = false;
  isModalCreationOpen = false;
  isModalInfoOpen = false;
  isHelpOpen = false;

  reiseantrittForCreation = null;
  reiseendeForCreation = null;

  setModificationOpenTrue(trip: any) {
    this.isModalModificationOpen = true;
    this.scopedTrip = trip;
    this.scopedKuerzel = trip.kuerzel;

    // Wieso wird mir hier bei der Ausgabe im datetime jeweils immer ein Tag abgezogen? Liegt das an einer anderen Zeitzone?
    var reiseantrittDate = new Date(this.scopedTrip.reiseantritt);
    this.scopedTrip.reiseantritt = new Date(
      reiseantrittDate.getFullYear(),
      reiseantrittDate.getMonth(),
      reiseantrittDate.getDate() + 1
    ).toISOString();
    var reiseendeDate = new Date(this.scopedTrip.reiseende);
    this.scopedTrip.reiseende = new Date(
      reiseendeDate.getFullYear(),
      reiseendeDate.getMonth(),
      reiseendeDate.getDate() + 1
    ).toISOString();
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

  setHelpOpenTrue() {
    this.isHelpOpen = true;
  }

  setHelpOpenFalse() {
    this.isHelpOpen = false;
  }

  confirmCreation() {
    this.setCreationOpenFalse();

    var trip = {
      kuerzel: this.tripForm.get('kuerzel')?.value!,
      reisende: this.tripForm.get('reisende')?.value!,
      reiseziel: this.tripForm.get('reiseziel')?.value!,
      reiseantritt: this.datePipe.transform(
        this.tripForm.get('reiseantritt')?.value,
        'yyyy/MM/dd'
      )!,
      reiseende: this.datePipe.transform(
        this.tripForm.get('reiseende')?.value,
        'yyyy/MM/dd'
      )!,
      gesamttage: this.differenceDays(),
      gesamtpreis: this.tripForm.get('gesamtpreis')?.value!,
    };
    this.tripService.addTrip(trip);
    this.informAboutChange(trip.kuerzel, 'create');
  }

  private differenceDays() {
    const reiseantritt = this.datePipe.transform(
      this.tripForm.get('reiseantritt')?.value,
      'MM/dd/yyyy'
    );
    const reiseende = this.datePipe.transform(
      this.tripForm.get('reiseende')?.value,
      'MM/dd/yyyy'
    );

    var reiseantrittDate = new Date(reiseantritt!);
    var reiseendeDate = new Date(reiseende!);
    var differenceMillis = reiseendeDate.getTime() - reiseantrittDate.getTime();
    return differenceMillis / (1000 * 3600 * 24);
  }

  tripForm = new FormGroup({
    kuerzel: new FormControl('', [Validators.required]),
    reisende: new FormControl(1, [Validators.required, Validators.max(10)]),
    reiseziel: new FormControl('', [Validators.required]),
    reiseantritt: new FormControl('', [Validators.required]),
    reiseende: new FormControl('', [Validators.required]),
    gesamtpreis: new FormControl('', [
      Validators.required,
      Validators.max(10000),
    ]),
  });

  confirmModification() {
    var trip = {
      kuerzel: this.tripForm.get('kuerzel')?.value!,
      reisende: this.tripForm.get('reisende')?.value!,
      reiseziel: this.tripForm.get('reiseziel')?.value!,
      reiseantritt: this.datePipe.transform(
        this.tripForm.get('reiseantritt')?.value,
        'yyyy/MM/dd'
      )!,
      reiseende: this.datePipe.transform(
        this.tripForm.get('reiseende')?.value,
        'yyyy/MM/dd'
      )!,
      gesamttage: this.differenceDays(),
      gesamtpreis: this.tripForm.get('gesamtpreis')?.value!,
    };

    this.tripService.modifyTrip(trip, this.scopedKuerzel);
    this.informAboutChange(trip.kuerzel, 'modify');
    this.setModificationOpenFalse();
  }

  async deleteTrip(trip: any) {
    this.tripService.deleteTrip(trip.kuerzel);
    this.informAboutChange(trip.kuerzel, 'delete');
  }

  async informAboutChange(kuerzel: any, type: string) {
    var changeType;
    if (type == 'create') {
      changeType = 'hinzugefügt.';
    } else if (type == 'modify') {
      changeType = 'geändert.';
    } else if (type == 'delete') {
      changeType = 'gelöscht.';
    }

    const toast = await this.toastController.create({
      message: 'Die Reise ' + kuerzel + ' wurde ' + changeType,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
