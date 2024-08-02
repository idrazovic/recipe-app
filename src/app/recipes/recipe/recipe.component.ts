import { Component, input } from '@angular/core';
import { Recipe } from './recipe.model';
import { IngredientComponent } from "../../ingredients/ingredient/ingredient.component";

@Component({
    selector: 'app-recipe',
    standalone: true,
    imports: [IngredientComponent],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
    recipe = input.required<Recipe>();
}
