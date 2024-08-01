import { createReducer, on } from "@ngrx/store";

import { getRecipesSuccess } from "./recipes.actions";
import { Recipe } from "../../recipes/recipe/recipe.model";

export const initialState: Recipe[] = [];

export const recipesReducer = createReducer(
    initialState,
    on(getRecipesSuccess, (_state, { payload }) => (payload)),
);