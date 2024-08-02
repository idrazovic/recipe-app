import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../ingredients/ingredient/ingredient.model';

export const getIngredients = createAction('[Ingredients] Get ingredients');

export const getIngredientsSuccess = createAction(
    '[Ingredients] Get ingredients success',
    props<{ payload: Ingredient[] }>()
)

export const selectIngredient = createAction(
    '[Ingredients] Select ingredient',
    props<{ payload: number }>()
)