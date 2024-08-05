import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { IngredientComponent } from "../../ingredients/ingredient/ingredient.component";
import { addIngredientsToCart } from '../../store/cart/cart.actions';

@Component({
    selector: 'app-recipe',
    standalone: true,
    imports: [IngredientComponent, CommonModule],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
    recipe = input.required<Recipe>();

    constructor(private store: Store) { }

    onRecipeClick() {
        this.store.dispatch(
            addIngredientsToCart({
                payload: {
                    ingredients: this.recipe().ingredients,
                    ingredientIds: this.recipe().ingredientIds
                }
            })
        );
    }
}