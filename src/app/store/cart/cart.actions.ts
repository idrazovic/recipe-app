import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../ingredients/ingredient/ingredient.model';

export interface AddIngredientsToCartPayload {
    ingredients: Ingredient[],
    ingredientIds: number[]
}

export const selectCart = createAction('[Cart] Get cart');

export const addIngredientsToCart = createAction(
    '[Cart] Add Ingredients to Cart',
    props<{ payload: AddIngredientsToCartPayload }>()
)

export const checkout = createAction('[Cart] Checkout', props<{ payload: Ingredient[] }>());

export const checkoutSuccess = createAction('[Cart] Checkout success');

export const checkoutError = createAction('[Cart] Checkout error', props<{ payload: string }>())