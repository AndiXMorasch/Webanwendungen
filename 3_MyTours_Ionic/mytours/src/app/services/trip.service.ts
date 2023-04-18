import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  private url =
    'https://my-json-server.typicode.com/Convi57/Webanwendungen/trips';
  tripList: any = this.getTripListFromLocalStorage();
  private tmp = this.initTripList();

  public getTripListFromLocalStorage(): string[] {
    return JSON.parse(localStorage.getItem('tripList')!);
  }

  private initTripList() {
    if (!this.tripList) {
      this.getPosts().subscribe((response) => {
        this.tripList = response;
        this.saveTripListToLocalStorage();
      });
    }
  }

  private getPosts() {
    return this.http.get(this.url);
  }

  private saveTripListToLocalStorage() {
    localStorage.setItem('tripList', JSON.stringify(this.tripList));
  }

  tripForm = new FormGroup({
    kuerzel: new FormControl('', [Validators.required]),
    reisende: new FormControl(1, [Validators.required]),
    reiseziel: new FormControl('', [Validators.required]),
    reiseantritt: new FormControl('', [Validators.required]),
    reiseende: new FormControl('', [Validators.required]),
    gesamtpreis: new FormControl('', [Validators.required]),
  });

  private idExists() {
    let exists = -1;
    this.tripList.forEach(
      (trip: { kuerzel: string | null | undefined }, index: number) => {
        if (trip.kuerzel === this.tripForm.get('kuerzel')?.value) {
          exists = index;
        }
      }
    );
    return exists;
  }

  deleteTrip() {
    var kuerzel = this.tripForm.get('kuerzel')?.value;
    if (kuerzel) {
      this.tripList.forEach(
        (trip: { kuerzel: string | null | undefined }, index: any) => {
          if (trip.kuerzel === kuerzel) {
            this.tripList.splice(index, 1);
            this.saveTripListToLocalStorage();
          }
        }
      );
    }
  }
}
