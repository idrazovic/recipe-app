import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    http = inject(HttpClient);
    url = '../assets/data/recipes.json';

    getAll() {
        return this.http.get<{ recipes: Recipe[] }>(this.url);
    }
}
