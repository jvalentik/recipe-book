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

  private showSnack(item: string): void {
    let snack = this.toastCtrl.create({
      message: `${item} was removed`,
      duration: 3000
    });
    snack.present();
  }

  onItemCheck(index: number): void {
    this.showSnack(this.provider.removeItem(index).name);
    this.loadItems();
  }

  onAddItem() {
    let modal = this.modalCtrl.create('EditShoppingListPage');
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
