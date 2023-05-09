import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  chats: Observable<any[]>;
  username: string | undefined;
  text: string | undefined;

  constructor(private firestore: Firestore) {
    const col = collection(firestore, 'room_0');
    const q = query(col, orderBy('timestamp', 'asc'));
    this.chats = collectionData(q);
  }

  public getCurrentUsername() {
    return JSON.parse(localStorage.getItem('username')!);
  }

  public saveUsernameToLocalStorage(username: any) {
    localStorage.clear();
    localStorage.setItem('username', JSON.stringify(username));
  }

  async sendMessage() {
    this.username = "Joe Doe" // TODO -> später gegen LocalStorage Zugriff ersetzen
    if (this.username == undefined || this.text == undefined || this.text.length == 0) {
      console.error("Eine Ihrer Daten ist unvollständig.");
      return;
    }

    await addDoc(collection(this.firestore, 'room_0'), {
      'author': this.username,
      'text': this.text,
      'timestamp': serverTimestamp()
    });
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
