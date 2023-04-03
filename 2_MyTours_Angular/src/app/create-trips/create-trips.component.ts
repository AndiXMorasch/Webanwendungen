import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-create-trips',
  templateUrl: './create-trips.component.html',
  styleUrls: ['./create-trips.component.css'],
  providers: [DatePipe],
})
@Injectable({
  providedIn: 'root',
})
export class CreateTripsComponent {
  // Weitere TODO's:
  // TODO: Gibt es eine Möglichkeit CreateTripsComponent noch weiter zu unterteilen? z.B. in verschiedene
  // Klassen bzw. Services: TripValidation, TripCRUD, HttpTripService etc.
  // TODO: Abflugdatum und Ankunftsdatum initial befüllen
  // TODO: Reise Löschen Button, soll dann aktiv werden wenn das Kürzel eingebeben wurde
  // TODO: Datum darf nicht in der Vergangenheit liegen
  constructor(private datePipe: DatePipe, private http: HttpClient) {}

  post: Post = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  };

  tripForm = new FormGroup({
    kuerzel: new FormControl('', [Validators.required]),
    reisende: new FormControl(1, [Validators.required]),
    reiseziel: new FormControl('', [Validators.required]),
    reiseantritt: new FormControl('', [Validators.required]),
    reiseende: new FormControl('', [Validators.required]),
    gesamtpreis: new FormControl('', [Validators.required]),
  });

  addTrip() {
    // Wenn die Id existiert -> bearbeiten
    let index = this.idExists();
    if (index != -1) {
      this.tripList[index] = {
        kuerzel: this.tripForm.get('kuerzel')?.value!,
        reisende: this.tripForm.get('reisende')?.value!,
        reiseziel: this.tripForm.get('reiseziel')?.value!,
        reiseantritt: this.datePipe.transform(
          this.tripForm.get('reiseantritt')?.value,
          'dd/MM/yyyy'
        )!,
        reiseende: this.datePipe.transform(
          this.tripForm.get('reiseende')?.value,
          'dd/MM/yyyy'
        )!,
        gesamttage: this.differenceDays(),
        gesamtpreis: this.tripForm.get('gesamtpreis')?.value! + ',00€',
      };
      this.saveTripListToLocalStorage();
    }
    // Wenn die Id nicht existiert -> anlegen
    else {
      this.tripList.push({
        kuerzel: this.tripForm.get('kuerzel')?.value!,
        reisende: this.tripForm.get('reisende')?.value!,
        reiseziel: this.tripForm.get('reiseziel')?.value!,
        reiseantritt: this.datePipe.transform(
          this.tripForm.get('reiseantritt')?.value,
          'dd/MM/yyyy'
        )!,
        reiseende: this.datePipe.transform(
          this.tripForm.get('reiseende')?.value,
          'dd/MM/yyyy'
        )!,
        gesamttage: this.differenceDays(),
        gesamtpreis: this.tripForm.get('gesamtpreis')?.value! + ',00€',
      });
      this.saveTripListToLocalStorage();
    }
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

  // Löschen
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

  get kuerzel() {
    return this.tripForm.get('kuerzel');
  }

  get reisende() {
    return this.tripForm.get('reisende');
  }

  get reiseziel() {
    return this.tripForm.get('reiseziel');
  }

  get reiseantritt() {
    return this.tripForm.get('reiseantritt');
  }

  get reiseende() {
    return this.tripForm.get('reiseende');
  }

  get gesamtpreis() {
    return this.tripForm.get('gesamtpreis');
  }

  private url =
    'https://my-json-server.typicode.com/Convi57/Webanwendungen/trips';

  getPosts() {
    return this.http.get(this.url);
  }

  // tripList mit Daten aus der db.json befüllen
  // und in den LocalStorage packen
  tripList = this.getTripListFromLocalStorage();
  tmp = this.checkTripListForNull();

  private checkTripListForNull() {
    if (!this.tripList) {
      this.initTripList();
    }
  }

  private initTripList() {
    this.getPosts().subscribe((response) => {
      this.tripList = response;
      this.saveTripListToLocalStorage();
    });
  }

  private saveTripListToLocalStorage() {
    localStorage.setItem('tripList', JSON.stringify(this.tripList));
  }

  public getTripListFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tripList')!);
  }

  public clearLocalStorage() {
    localStorage.removeItem('tripList');
    this.initTripList();
  }
}

export class HttpTripListService {
  constructor(private datePipe: DatePipe, private http: HttpClient) {}
  private url =
    'https://my-json-server.typicode.com/Convi57/Webanwendungen/trips';

  public getPosts() {
    return this.http.get(this.url);
  }
}

/*
export const tripList = [
  {
    kuerzel: 'USLA',
    reisende: 3,
    reiseziel: 'Los Angeles (USA)',
    reiseantritt: '27/08/2023',
    reiseende: '05/09/2023',
    gesamttage: 9,
    gesamtpreis: '3250,00€',
  },
  {
    kuerzel: 'ITPA',
    reisende: 2,
    reiseziel: 'Parma (Italien)',
    reiseantritt: '21/05/2023',
    reiseende: '30/05/2023',
    gesamttage: 8,
    gesamtpreis: '1570,00€',
  },
  {
    kuerzel: 'CHPE',
    reisende: 2,
    reiseziel: 'Peking (China)',
    reiseantritt: '10/06/2023',
    reiseende: '24/06/2023',
    gesamttage: 13,
    gesamtpreis: '2455,00€',
  },
  {
    kuerzel: 'SAKP',
    reisende: 1,
    reiseziel: 'Kapstadt (Südafrika)',
    reiseantritt: '20/06/2023',
    reiseende: '05/07/2023',
    gesamttage: 14,
    gesamtpreis: '2275,00€',
  },
  {
    kuerzel: 'BRRI',
    reisende: 3,
    reiseziel: 'Rio de Janeiro (Brasilien)',
    reiseantritt: '29/07/2023',
    reiseende: '11/08/2023',
    gesamttage: 12,
    gesamtpreis: '4150,00€',
  },
  {
    kuerzel: 'CR13',
    reisende: 2,
    reiseziel: "Kreuzfahrt 'Majesty'",
    reiseantritt: '26/05/2023',
    reiseende: '01/06/2023',
    gesamttage: 5,
    gesamtpreis: '1200,00€',
  },
];
*/
