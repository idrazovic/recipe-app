import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { getRecipes } from '../store/recipes/recipes.actions';
import { Recipe } from './recipe/recipe.model';
import { RecipeComponent } from "./recipe/recipe.component";
import { selectRecipes } from '../store/recipes/recipes.selectors';

@Component({
    selector: 'app-recipes',
    standalone: true,
    imports: [AsyncPipe, RecipeComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
    recipes$: Observable<Recipe[]>;

    constructor(private store: Store<{ recipes: Recipe[] }>) {
        this.recipes$ = this.store.select(selectRecipes);
    }

    ngOnInit() {
        this.store.dispatch(getRecipes());
    }
}
