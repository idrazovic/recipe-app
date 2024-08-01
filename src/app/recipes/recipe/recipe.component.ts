import { Component, input } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
    selector: 'app-recipe',
    standalone: true,
    imports: [],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
    recipe = input.required<Recipe>();
}
