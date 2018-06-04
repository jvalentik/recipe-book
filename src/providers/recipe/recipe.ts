import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Injectable()
export class RecipeProvider {
  private recipes: Array<Recipe> = [];

  addItem(recipe: Recipe): void {
    this.recipes.push(recipe);
    console.log(`Recipe saved: ${recipe}`);
  }

  getItem(index: number): Recipe {
    return this.recipes[index];
  }

  getItems(): Array<Recipe> {
    return this.recipes.slice();
  }

  replaceItem(index: number, newItem: Recipe): void {
    this.recipes[index] = newItem;
  }

  removeItem(index: number): void {
    this.recipes.splice(index, 1);
  }

}
