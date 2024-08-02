import { Component } from '@angular/core';

import { RecipesComponent } from "./recipes/recipes.component";
import { IngredientsComponent } from "./ingredients/ingredients.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RecipesComponent, IngredientsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent { }
