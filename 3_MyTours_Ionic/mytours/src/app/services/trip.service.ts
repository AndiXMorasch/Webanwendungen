import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  private url =
    'https://my-json-server.typicode.com/Convi57/Webanwendungen/trips';
  tmp: any = this.fillTripList();

  fillTripList(): void {
    // Falls leer, initial befüllen
    if (!this.getCurrentTripList()) {
      this.initTripList();
    }
  }

  // TripList aus dem LocalStorage holen
  public getCurrentTripList() {
    return JSON.parse(localStorage.getItem('tripList')!);
  }

  // TripList mit Daten aus der JSON-DB initialisieren
  private initTripList() {
    this.http.get(this.url).subscribe((response) => {
      this.saveTripListToLocalStorage(response);
    });
  }

  // Local Storage zurücksetzen
  public resetLocalStorage() {
    localStorage.clear();
    this.initTripList();
  }

  // TripList zum im LocalStorage speichern
  public saveTripListToLocalStorage(tripList: any) {
    localStorage.clear();
    localStorage.setItem('tripList', JSON.stringify(tripList));
  }

  // Reise hinzufügen
  public addTrip(trip: any) {
    if (this.idExists(trip.kuerzel) == -1) {
      var tripList = this.getCurrentTripList();
      tripList.push({
        kuerzel: trip.kuerzel,
        reisende: trip.reisende,
        reiseziel: trip.reiseziel,
        reiseantritt: trip.reiseantritt,
        reiseende: trip.reiseende,
        gesamttage: trip.gesamttage,
        gesamtpreis: trip.gesamtpreis,
      });

      this.saveTripListToLocalStorage(tripList);
      console.log(tripList);
    } else {
      console.log(
        'Reise kann nicht hinzugefügt werden, das Kürzel existiert bereits.'
      );
    }
  }

  private idExists(kuerzel: string) {
    let exists = -1;
    this.getCurrentTripList().forEach(
      (trip: { kuerzel: string | null | undefined }, index: number) => {
        if (trip.kuerzel === kuerzel) {
          exists = index;
        }
      }
    );
    return exists;
  }

  // Reise ändern
  public modifyTrip(trip: any, id: string) {
    if (this.idExists(id) != -1) {
      var tripList = this.getCurrentTripList();
      tripList.forEach(
        (t: { kuerzel: string | null | undefined }, index: any) => {
          if (t.kuerzel === id) {
            tripList[index].kuerzel = trip.kuerzel;
            tripList[index].reisende = trip.reisende;
            tripList[index].reiseziel = trip.reiseziel;
            tripList[index].reiseantritt = trip.reiseantritt;
            tripList[index].reiseende = trip.reiseende;
            tripList[index].gesamttage = trip.gesamttage;
            tripList[index].gesamtpreis = trip.gesamtpreis;
            this.saveTripListToLocalStorage(tripList);
          }
        }
      );
    } else {
      console.log('Keine Reise mit der ID ' + id + ' gefunden.');
    }
  }

  // Reise löschen
  public deleteTrip(id: string) {
    if (this.idExists(id) != -1) {
      var tripList = this.getCurrentTripList();
      tripList.forEach(
        (trip: { kuerzel: string | null | undefined }, index: any) => {
          if (trip.kuerzel === id) {
            tripList.splice(index, 1);
            this.saveTripListToLocalStorage(tripList);
          }
        }
      );
    } else {
      console.log('Keine Reise mit der ID ' + id + ' gefunden.');
    }
  }
}
