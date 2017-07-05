import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { RecipeProvider } from '../../providers/recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Array<Recipe> = [];

  constructor(private navCtrl: NavController,
              private recipeProvider: RecipeProvider) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipeProvider.getItems();
  }

  onNewRecipe(): void {
    this.navCtrl.push('EditRecipePage', { mode: 'New' });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push('RecipeDetailPage', { recipe: recipe, index: index });
  }

}
