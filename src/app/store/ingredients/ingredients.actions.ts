import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../ingredients/ingredient/ingredient.model';

export const getIngredients = createAction('[Ingredients] Get ingredients');

export const getIngredientsSuccess = createAction(
    '[Ingredients] Get ingredients success',
    props<{ payload: Ingredient[] }>()
)

export const getIngredientsError = createAction(
    '[Ingredients] Get ingredients error',
    props<{ payload: string }>()
)

export const selectIngredient = createAction(
    '[Ingredients] Select ingredient',
    props<{ payload: Ingredient }>()
)

export const selectIngredientError = createAction(
    '[Ingredients] Select ingredient error',
    props<{ payload: string }>()
)

export const saveToLocalStorageSuccess = createAction(
    '[Ingredients] Save to local storage success',
)
