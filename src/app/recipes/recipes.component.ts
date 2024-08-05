import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { getRecipes } from '../store/recipes/recipes.actions';
import { Recipe } from './recipe/recipe.model';
import { RecipeComponent } from "./recipe/recipe.component";
import { selectRecipes } from '../store/recipes/recipes.selectors';
import { Ingredient } from '../ingredients/ingredient/ingredient.model';
import { IngredientsState } from '../store/ingredients/ingredients.reducers';

@Component({
    selector: 'app-recipes',
    standalone: true,
    imports: [AsyncPipe, RecipeComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
    recipes = signal<Recipe[]>([]);
    destroyRef = inject(DestroyRef);
    contentLoaded = signal(false);

    constructor(private store: Store<{ recipes: Recipe[], ingredients: IngredientsState }>) {
        const subcription = this.store.select(selectRecipes)
            .pipe(
                map(({ recipes, ingredients }) => {
                    return recipes.map<Recipe>(recipe => this.addIngredients(recipe, ingredients.data));
                }),
            ).subscribe((recipes) => {
                const ingredientsAddedToRecipes = recipes.length && recipes[0].ingredients.length;
                if (ingredientsAddedToRecipes) {
                    this.contentLoaded.set(true);
                }

                this.recipes.set(recipes);
            });

        this.destroyRef.onDestroy(() => subcription.unsubscribe());
    }

    ngOnInit() {
        this.store.dispatch(getRecipes());
    }

    private addIngredients(recipe: Recipe, ingredients: Ingredient[]) {
        {
            const recipeIngredients = ingredients
                .filter(ingredient => recipe.ingredientIds.includes(ingredient.id));

            return {
                ...recipe,
                ingredients: recipeIngredients,
                allIngredientsSelected: recipeIngredients.every(ingredient => ingredient.selected),
                someIngredientsSelected: recipeIngredients.some(ingredient => ingredient.selected)
            }
        }
    }
}
