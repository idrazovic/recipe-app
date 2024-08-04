import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, throwError } from 'rxjs';

import { Ingredient } from './ingredient/ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {
    url = '../assets/data/ingredients.json';

    constructor(private http: HttpClient) { }

    private getSelectedIngredientsIds() {
        return JSON.parse(localStorage.getItem('selectedIngredientsIds') || '[]');
    }

    getAll() {
        const selectedIngredientsIds = this.getSelectedIngredientsIds();

        return this.http.get<{ ingredients: Ingredient[] }>(this.url)
            .pipe(
                map(({ ingredients }) => {
                    return ingredients.map(ingredient => {
                        return {
                            ...ingredient,
                            selected: selectedIngredientsIds.includes(ingredient.id)
                        }
                    })
                }),
                delay(300)
            );
    }

    updateSelectedIngredientInLocaleStorage(ingredient: Ingredient) {
        const ingredients = this.getSelectedIngredientsIds();

        if (!ingredient.selected) {
            ingredients.push(ingredient.id);
        } else {
            ingredients.splice(ingredients.indexOf(ingredient.id), 1);
        }

        localStorage.setItem('selectedIngredientsIds', JSON.stringify(ingredients));
    }
}
