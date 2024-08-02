import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { recipesReducer } from './store/recipes/recipes.reducers';
import { ingredientsReducer } from './store/ingredients/ingredients.reducers';
import * as  RecipesEffects from './store/recipes/recipes.effects';
import * as IngredientsEffects from './store/ingredients/ingredients.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideStore({ recipes: recipesReducer, ingredients: ingredientsReducer }),
        provideEffects(RecipesEffects, IngredientsEffects),
        provideHttpClient()
    ]
};
