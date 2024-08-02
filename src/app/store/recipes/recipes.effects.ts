import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, exhaustMap, catchError, tap, withLatestFrom } from 'rxjs/operators';

import { RecipesService } from '../../recipes/recipes.service';
import { getRecipes, getRecipesSuccess } from './recipes.actions';
import { Recipe } from '../../recipes/recipe/recipe.model';
import { Store } from '@ngrx/store';
import { selectIngredients } from '../ingredients/ingredients.selectors';

export const getRecipes$ = createEffect(
    (
        actions$ = inject(Actions),
        recipesService = inject(RecipesService)
    ): Observable<{ type: string, payload: Recipe[] }> => {
        return actions$.pipe(
            ofType(getRecipes),
            exhaustMap(() => recipesService.getAll()
                .pipe(
                    map(({ recipes }) => (getRecipesSuccess({ payload: recipes }))),
                    catchError(() => EMPTY)
                ))
        );
    },
    { functional: true }
);