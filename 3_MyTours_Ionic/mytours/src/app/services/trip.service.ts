import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private datePipe: DatePipe, private http: HttpClient) { }

  private url = 'https://my-json-server.typicode.com/Convi57/Webanwendungen/trips';
  tripList = this.getTripListFromLocalStorage();
  tmp = this.initTripList();

  public getTripListFromLocalStorage() {
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
}
