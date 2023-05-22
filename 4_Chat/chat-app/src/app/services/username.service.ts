import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor() { }

  public getCurrentUsername() {
    return JSON.parse(localStorage.getItem('username')!);
  }

  public saveUsernameToLocalStorage(username: any) {
    localStorage.clear();
    localStorage.setItem('username', JSON.stringify(username));
  }
}
