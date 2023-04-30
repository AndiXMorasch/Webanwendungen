import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripService implements OnInit {
  constructor(private http: HttpClient) {}

  private url =
    'https://my-json-server.typicode.com/Convi57/Webanwendungen/trips';
  tripList: any = this.getTripListFromLocalStorage();

  ngOnInit(): void {
    if (!this.tripList) {
      this.initTripList();
    }
  }

  public getTripListFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tripList')!);
  }

  private initTripList() {
    this.getPosts().subscribe((response) => {
      this.tripList = response;
      this.saveTripListToLocalStorage();
    });
  }

  public clearLocalStorage() {
    localStorage.removeItem('tripList');
    this.initTripList();
  }

  private getPosts() {
    return this.http.get(this.url);
  }

  public saveTripListToLocalStorage() {
    localStorage.setItem('tripList', JSON.stringify(this.tripList));
  }

  public addTrip(trip: any) {
    if (this.idExists(trip.kuerzel) == -1) {
      this.tripList.push({
        kuerzel: trip.kuerzel,
        reisende: trip.reisende,
        reiseziel: trip.reiseziel,
        reiseantritt: trip.reiseantritt,
        reiseende: trip.reiseende,
        gesamttage: trip.gesamttage,
        gesamtpreis: trip.gesamtpreis,
      });

      this.saveTripListToLocalStorage();
      console.log(this.tripList);
    }
  }

  public idExists(kuerzel: string) {
    let exists = -1;
    this.tripList.forEach(
      (trip: { kuerzel: string | null | undefined }, index: number) => {
        if (trip.kuerzel === kuerzel) {
          exists = index;
        }
      }
    );
    return exists;
  }

  public modifyTrip(trip: any) {
    if (this.idExists(trip.kuerzel) != -1) {
      this.tripList.forEach(
        (t: { kuerzel: string | null | undefined }, index: any) => {
          if (t.kuerzel === trip.kuerzel) {
            this.tripList[index].kuerzel = trip.kuerzel;
            this.tripList[index].reisende = trip.reisende;
            this.tripList[index].reiseziel = trip.reiseziel;
            this.tripList[index].reiseantritt = trip.reiseantritt;
            this.tripList[index].reiseende = trip.reiseende;
            this.tripList[index].gesamttage = trip.gesamttage;
            this.tripList[index].gesamtpreis = trip.gesamtpreis;
            this.saveTripListToLocalStorage();
          }
        }
      );
    }
  }

  public deleteTrip(id: string) {
    if (this.idExists(id) != -1) {
      this.tripList.forEach(
        (trip: { kuerzel: string | null | undefined }, index: any) => {
          if (trip.kuerzel === id) {
            this.tripList.splice(index, 1);
            this.saveTripListToLocalStorage();
          }
        }
      );
    }
  }
}
