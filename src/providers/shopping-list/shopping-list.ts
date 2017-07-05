import { Ingredient } from '../../models/ingredient';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListProvider {
  private ingredients: Array<Ingredient> = [];

  constructor() {
  }

  addItem(name: string, amount: number): void {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(ingredients: Array<Ingredient>): void {
    this.ingredients.push(...ingredients);
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
