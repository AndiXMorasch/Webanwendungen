import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UsernameService } from '../services/username.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {

  chats: Observable<any[]>;
  text: string | undefined;
  username = "Joe Doe";

  constructor(private firestore: Firestore, private usernameService: UsernameService) {
    const col = collection(firestore, 'room_0');
    const q = query(col, orderBy('timestamp', 'asc'));
    this.chats = collectionData(q);
  }

  async sendMessage() {
    if (this.usernameService.getCurrentUsername() == undefined) {
      this.username = "unbekannter Nutzer";
      console.log("Legen Sie sich bitte noch einen Usernamen an... Sie heißen jetzt temporär 'unbekannter Nutzer'")
    } else {
      this.username = this.usernameService.getCurrentUsername();
    }

    if (this.text == undefined || this.text.length == 0) {
      console.log("Ihr zu sendender Text darf nicht leer sein.")
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
