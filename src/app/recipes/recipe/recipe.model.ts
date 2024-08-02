import { Ingredient } from "../../ingredients/ingredient/ingredient.model";

export interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredientIds: number[];
    ingredients: Ingredient[];
};