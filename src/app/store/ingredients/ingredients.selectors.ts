import { IngredientsState } from "./ingredients.reducers";

export const selectIngredients = (state: { ingredients: IngredientsState }) => state.ingredients.data;

export const selectIngredientsError = (state: { ingredients: { errorMessage: string } }) => state.ingredients.errorMessage;