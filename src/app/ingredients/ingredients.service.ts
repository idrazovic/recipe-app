import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {
    http = inject(HttpClient);
    url = '../assets/data/ingredients.json';

    getAll() {
        return this.http.get<{ ingredients: Recipe[] }>(this.url);
    }
}
