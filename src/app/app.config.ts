import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { recipesReducer } from './store/recipes/recipes.reducers';
import * as  RecipesEffects from './store/recipes/recipes.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideStore({ recipes: recipesReducer }),
        provideEffects(RecipesEffects),
        provideHttpClient()
    ]
};
