import { Component } from '@angular/core';
import { IonicPage, ModalController, ToastController } from 'ionic-angular';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { Ingredient } from '../../models/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  shoppingList: Array<Ingredient>;

  constructor(public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public provider: ShoppingListProvider) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private showSnack(msg: string): void {
    let snack = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    snack.present();
  }

  onItemRemove(index: number): void {
    this.showSnack(`${this.provider.removeItem(index).name} was removed`);
    this.loadItems();
  }

  onItemEdit(index: number): void {
    let modal = this.modalCtrl.create('EditShoppingListPage', { id: index });
    modal.onDidDismiss((data) => {
      if (data) {
        this.showSnack(`${this.provider.removeItem(index).name} was updated`);
        this.provider.addItem(data.ingredientName, data.amount);
        this.loadItems();
      }
    });
    modal.present();
  }

  onAddItem() {
    let modal = this.modalCtrl.create('EditShoppingListPage', { id: 'new' });
    modal.onDidDismiss((data) => {
      if (data) {
        this.provider.addItem(data.ingredientName, data.amount);
        this.loadItems();
      }
    });
    modal.present();
  }

  private loadItems(): void {
    this.shoppingList = this.provider.getItems();
  }

}
