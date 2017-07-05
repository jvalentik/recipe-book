import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { RecipeProvider } from '../../providers/recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html',
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private slProvider: ShoppingListProvider,
              private rcpProvider: RecipeProvider) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push('EditRecipePage',
      { mode: 'Edit', recipe: this.recipe, index: this.index });
  }

  onAddIngredients() {
    this.slProvider.addItems(this.recipe.ingredients);
    this.toastCtrl.create({
      message: 'Shopping list created',
      duration: 2000
    }).present();
  }

  onDeleteRecipe() {
    this.rcpProvider.removeItem(this.index);
    this.navCtrl.popToRoot();
  }
}
