import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { IngredientsService } from '../../ingredients/ingredients.service';
import { getIngredients, getIngredientsSuccess } from './ingredients.actions';
import { Ingredient } from '../../ingredients/ingredient/ingredient.model';

export const getIngredients$ = createEffect(
    (
        actions$ = inject(Actions),
        ingredientsService = inject(IngredientsService)
    ): Observable<{ type: string, payload: Ingredient[] }> => {
        return actions$.pipe(
            ofType(getIngredients),
            exhaustMap(() => ingredientsService.getAll()
                .pipe(
                    map(({ ingredients }) => (getIngredientsSuccess({ payload: ingredients }))),
                    catchError(() => EMPTY)
                ))
        );
    },
    { functional: true }
);