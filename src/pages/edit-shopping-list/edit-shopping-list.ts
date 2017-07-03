import { Component } from '@angular/core';
import { AlertController, IonicPage, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage {

  constructor(public viewCtrl: ViewController,
              public alertCtrl: AlertController) {
  }

  dismiss(form: NgForm): void {
    if (form.dirty) {
      this.showConfirm();
    } else {
      this.viewCtrl.dismiss();
    }
  }

  onSave(form: NgForm): void {
    this.viewCtrl.dismiss(form.value);
  }

  private showConfirm(): void {
    let confirm = this.alertCtrl.create({
      message: 'Discard changes?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'NO'
        }
      ]
    });
    confirm.present();
  }
}
