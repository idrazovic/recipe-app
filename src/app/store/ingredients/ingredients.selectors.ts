import { Ingredient } from "../../ingredients/ingredient/ingredient.model";


export const selectIngredients = (state: { ingredients: Ingredient[] }) => state.ingredients;