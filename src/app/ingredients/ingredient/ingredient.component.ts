import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Ingredient } from './ingredient.model';
import { selectIngredient } from '../../store/ingredients/ingredients.actions';

@Component({
    selector: 'app-ingredient',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ingredient.component.html',
    styleUrl: './ingredient.component.scss'
})
export class IngredientComponent {
    ingredient = input.required<Ingredient>();

    constructor(private store: Store<{ ingredients: Ingredient[] }>) { }

    onSelect() {
        this.store.dispatch(selectIngredient({ payload: this.ingredient().id }));
    }
}
