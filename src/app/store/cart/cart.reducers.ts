import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../ingredients/ingredient/ingredient.model";
import { addIngredientsToCart, checkout, checkoutError, checkoutSuccess } from "./cart.actions";

export interface CartState {
    ingredients: Ingredient[];
    totalItems: number;
    errorMessage?: string;
};

export const initialState: CartState = {
    ingredients: [],
    totalItems: 0,
};

export const cartReducer = createReducer(
    initialState,
    on(addIngredientsToCart, (state, { payload }) => {
        const { ingredients } = state;

        const filteredStateIngredients = ingredients.filter((ingredient) => !payload.ingredientIds.includes(ingredient.id));
        const unselectedPayloadIngredients = payload.ingredients.filter((ingredient) => !ingredient.selected);
        const updatedIngredients = [...filteredStateIngredients, ...unselectedPayloadIngredients];

        return {
            ingredients: updatedIngredients,
            totalItems: updatedIngredients.length
        }
    }),
    on(checkoutSuccess, () => initialState),
    on(checkoutError, (state, { payload }) => ({ ...state, errorMessage: payload }))
);