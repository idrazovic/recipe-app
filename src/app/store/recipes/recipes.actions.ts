import { createAction, props } from '@ngrx/store';

import { Recipe } from '../../recipes/recipe/recipe.model';

export const getRecipes = createAction('[Recipes] Get recipes');

export const getRecipesSuccess = createAction(
    '[Recipes] Get recipes success',
    props<{ payload: Recipe[] }>()
)