import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';

import { getRecipes } from '../store/recipes/recipes.actions';
import { Recipe } from './recipe/recipe.model';
import { RecipeComponent } from "./recipe/recipe.component";
import { selectRecipes } from '../store/recipes/recipes.selectors';
import { Ingredient } from '../ingredients/ingredient/ingredient.model';

@Component({
    selector: 'app-recipes',
    standalone: true,
    imports: [AsyncPipe, RecipeComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
    recipes = signal<Recipe[]>([]);

    constructor(private store: Store<{ recipes: Recipe[], ingredients: Ingredient[] }>) {
        this.store.select(selectRecipes).pipe(
            map(({ recipes, ingredients }) => {
                return recipes.map(recipe => ({
                    ...recipe, ingredients: ingredients.filter(ingredient => recipe.ingredientIds.includes(ingredient.id))
                }));
            })
        ).subscribe((recipes) => this.recipes.set(recipes));
    }

    ngOnInit() {
        this.store.dispatch(getRecipes());
    }
}
