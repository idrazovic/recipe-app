import { Recipe } from "../../recipes/recipe/recipe.model";
import { IngredientsState } from "../ingredients/ingredients.reducers";

export const selectRecipes = (state: { recipes: Recipe[], ingredients: IngredientsState }) => state;