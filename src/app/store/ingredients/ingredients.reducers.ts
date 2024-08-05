import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../ingredients/ingredient/ingredient.model";
import { getIngredientsError, getIngredientsSuccess, selectIngredient, selectIngredientError } from "./ingredients.actions";

export interface IngredientsState {
    data: Ingredient[],
    errorMessage: string
};

export const initialState: IngredientsState = {
    data: [],
    errorMessage: ''
};

export const ingredientsReducer = createReducer(
    initialState,
    on(getIngredientsSuccess, (_state, { payload }) => ({ data: payload, errorMessage: '' })),
    on(getIngredientsError, (_state, { payload }) => ({ data: [], errorMessage: payload })),
    on(selectIngredient, (state, { payload }) => {
        const ingredients = [...state.data];
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.id === payload.id) {
                return {
                    ...ingredient,
                    selected: !ingredient.selected
                };
            }
            return ingredient;
        });

        return {
            ...state,
            data: updatedIngredients
        };
    }),
    on(selectIngredientError, (state, { payload }) => ({ ...state, errorMessage: payload }))
);