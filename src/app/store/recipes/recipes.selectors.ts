import { Ingredient } from "../../ingredients/ingredient/ingredient.model";
import { Recipe } from "../../recipes/recipe/recipe.model";

export const selectRecipes = (state: { recipes: Recipe[], ingredients: { data: Ingredient[] } }) => state;