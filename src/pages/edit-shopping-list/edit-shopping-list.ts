import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage implements OnInit {
  ingredientName: string;
  amount: number;
  title: string;

  constructor(public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public provider: ShoppingListProvider) {
  }

  ngOnInit(): void {
    this.ingredientName = '';
    this.amount = null;
    this.title = 'Add ingredient'
  }

  ionViewWillEnter(): void {
    if (this.navParams.get('id') !== 'new') {
      let item: Ingredient = this.provider.getItems()[this.navParams.get('id')];
      this.ingredientName = item.name;
      this.amount = item.amount;
      this.title = 'Edit ingredient';
    }
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
