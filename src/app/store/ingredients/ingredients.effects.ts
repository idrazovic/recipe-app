import { inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { IngredientsService } from '../../ingredients/ingredients.service';
import { Ingredient } from '../../ingredients/ingredient/ingredient.model';
import {
    getIngredients,
    getIngredientsError,
    getIngredientsSuccess,
    saveToLocalStorageSuccess,
    selectIngredient,
    selectIngredientError
} from './ingredients.actions';

export const getIngredients$ = createEffect(
    (
        actions$ = inject(Actions),
        ingredientsService = inject(IngredientsService)
    ): Observable<{ type: string, payload: Ingredient[] | string }> => {
        return actions$.pipe(
            ofType(getIngredients),
            exhaustMap(() => ingredientsService.getAll().pipe(
                map((ingredients) => (getIngredientsSuccess({ payload: ingredients }))),
                catchError((error: Error) => {
                    return of(getIngredientsError({ payload: error.message }));
                })
            )),
        );
    },
    { functional: true }
);


export const selectIngredient$ = createEffect(
    (
        actions$ = inject(Actions),
        ingredientsService = inject(IngredientsService)
    ): Observable<{ type: string }> => {
        return actions$.pipe(
            ofType(selectIngredient),
            tap(({ payload }) => ingredientsService.updateSelectedIngredientInLocaleStorage(payload)),
            map(() => (saveToLocalStorageSuccess())),
            catchError((error: Error) => {
                return of(selectIngredientError({ payload: error.message }));
            })
        );
    },
    { functional: true, dispatch: false }
);