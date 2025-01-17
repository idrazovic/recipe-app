import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

import { RecipesService } from '../../recipes/recipes.service';
import { getRecipes, getRecipesSuccess } from './recipes.actions';
import { Recipe } from '../../recipes/recipe/recipe.model';

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