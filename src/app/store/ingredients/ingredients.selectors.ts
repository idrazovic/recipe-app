import { Ingredient } from "../../ingredients/ingredient/ingredient.model";

export const selectIngredients = (state: { ingredients: { data: Ingredient[] } }) => state.ingredients.data;

export const selectIngredientsError = (state: { ingredients: { errorMessage: string } }) => state.ingredients.errorMessage