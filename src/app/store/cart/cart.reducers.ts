import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../ingredients/ingredient/ingredient.model";
import { addIngredientsToCart, checkout, checkoutSuccess } from "./cart.actions";

export interface CartState {
    ingredients: Ingredient[],
    totalItems: number
}

export const initialState: CartState = {
    ingredients: [],
    totalItems: 0
};

export const cartReducer = createReducer(
    initialState,
    on(addIngredientsToCart, (state, { payload }) => {
        const { ingredients } = state;

        const filteredStateIngredients = ingredients.filter((ingredient) => !payload.ingredientIds.includes(ingredient.id));
        const filteredPayloadIngredients = payload.ingredients.filter((ingredient) => !ingredient.selected);
        const updatedIngredients = [...filteredStateIngredients, ...filteredPayloadIngredients];

        return {
            ingredients: updatedIngredients,
            totalItems: updatedIngredients.length
        }
    }),
    on(checkoutSuccess, () => initialState)
);