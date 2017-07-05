import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { Ingredient } from '../../models/ingredient';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode: string = 'New';
  difficultyOptions = [ 'Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private actionCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeProvider: RecipeProvider) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.initForm(this.navParams.get('recipe'));
    } else {
      this.initForm();
    }
  }

  onSubmit(): void {
    const formValue = this.recipeForm.value;
    const ingredients: Array<Ingredient> = formValue.ingredients.map(name => {
      return new Ingredient(name, 1);
    });
    if (this.mode === 'Edit') {
      this.recipeProvider
          .replaceItem(this.navParams.get('index'),
            new Recipe(formValue.title,
              formValue.description,
              formValue.difficulty,
              ingredients));
    } else {
      this.recipeProvider
          .addItem(new Recipe(formValue.title,
            formValue.description,
            formValue.difficulty,
            ingredients));
    }
    this.navCtrl.popToRoot();
  }

  onManageIngredients(): void {
    const actionSheet = this.actionCtrl.create({
      title: 'What would you like to do?',
      buttons: [
        {
          text: 'Add ingredient',
          handler: () => {
            actionSheet.onDidDismiss(() => {
              this.creatAddIngredientAlert().present();
            });
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const fArr: FormArray = this.recipeForm.get('ingredients') as FormArray;
            const toastOptions = {
              message: null,
              duration: 2000
            };
            if (fArr.length > 0) {
              for (let i=fArr.length - 1; i>=0; i--) {
                fArr.removeAt(i);
              }
              toastOptions.message = 'All ingredients removed';
            } else {
              toastOptions.message = 'Nothing to be removed';
            }
            this.toastCtrl.create(toastOptions).present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private creatAddIngredientAlert(): any {
    return this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() === '' || data.name === null) {
              this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 2000 })
                  .present();
             return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            this.toastCtrl.create({
              message: `${data.name.trim()} added`,
              duration: 2000
            }).present();
          }
        }
      ]
    });
  }

  private initForm(recipe?: Recipe): void {
    let title: string = null;
    let description: string = null;
    let difficulty = 'Easy';
    let ingredients = [];
    if (recipe) {
      title = recipe.title;
      description = recipe.description;
      difficulty = recipe.difficulty;
      recipe.ingredients.forEach(ingredient => {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      });
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
}
