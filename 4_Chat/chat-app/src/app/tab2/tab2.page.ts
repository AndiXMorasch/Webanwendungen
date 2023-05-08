import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  chats: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const col = collection(firestore, 'room_0');
    const q = query(col, orderBy('timestamp', 'desc'));
    this.chats = collectionData(q);
  }

  public getCurrentUsername() {
    return JSON.parse(localStorage.getItem('username')!);
  }

  public saveUsernameToLocalStorage(username: any) {
    localStorage.clear();
    localStorage.setItem('username', JSON.stringify(username));
  }

  async addMessage(author: string, text: string) {
    await addDoc(collection(this.firestore, 'room_0'), {
      'author': author,
      'text': text,
      'timestamp': serverTimestamp()
    })
  }

}
