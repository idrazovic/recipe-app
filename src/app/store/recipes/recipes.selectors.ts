import { Recipe } from "../../recipes/recipe/recipe.model";

export const selectRecipes = (state: { recipes: Recipe[] }) => state.recipes;