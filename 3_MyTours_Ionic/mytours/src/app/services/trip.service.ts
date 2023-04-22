import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
      this.saveTripListToLocalStorage(response);
    });
  }

  public clearLocalStorage() {
    localStorage.removeItem('tripList');
    this.initTripList();
  }

  private getPosts() {
    return this.http.get(this.url);
  }

  public saveTripListToLocalStorage(tripList: any) {
    localStorage.setItem('tripList', JSON.stringify(tripList));
  }
}
