import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../ingredients/ingredient/ingredient.model";
import { getIngredientsSuccess, selectIngredient } from "./ingredients.actions";

export const initialState: Ingredient[] = [];

export const ingredientsReducer = createReducer(
    initialState,
    on(getIngredientsSuccess, (_state, { payload }) => (payload)),
    on(selectIngredient, (state, { payload }) => {
        const ingredients = [...state];
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.id === payload) {
                return {
                    ...ingredient,
                    selected: !ingredient.selected
                };
            }
            return ingredient;
        });

        return updatedIngredients;
    })
);