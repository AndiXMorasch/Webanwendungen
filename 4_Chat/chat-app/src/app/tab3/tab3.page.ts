import { Component } from '@angular/core';
import { UsernameService } from '../services/username.service';
import { AlertController } from '@ionic/angular';
import { Firestore, collection, getCountFromServer, orderBy, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private usernameService: UsernameService, private firestore: Firestore, private alertController: AlertController) { }

  username: string | undefined;

  public async setNewUsername() {
    if (this.username?.trim() == '') {
      return;
    }

    var col = collection(this.firestore, 'room_0');
    const q = query(col, where('author', '==', this.username));
    const count = await getCountFromServer(q);
    if (count.data().count === 0) {
      this.usernameService.saveUsernameToLocalStorage(this.username);
      console.log(this.username);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Hinweis',
      message: 'Der Nutzername ist bereits vergeben.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
