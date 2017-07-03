import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient';

@Injectable()
export class ShoppingListProvider {
  private ingredients: Array<Ingredient> = [];

  constructor() {
    console.log('Hello ShoppingListProvider Provider');
  }

  addItem(name: string, amount: number): void {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(ingredients: Array<Ingredient>): void {
    this.ingredients.push(...this.ingredients);
  }

  getItems(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  removeItem(index: number): Ingredient {
    let removedItem = this.ingredients[index];
    this.ingredients.splice(index, 1);
    return removedItem;
  }
}
