import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Ingredient } from './ingredient.model';
import { selectIngredient } from '../../store/ingredients/ingredients.actions';
import { IngredientsState } from '../../store/ingredients/ingredients.reducers';

@Component({
    selector: 'app-ingredient',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ingredient.component.html',
    styleUrl: './ingredient.component.scss'
})
export class IngredientComponent {
    ingredient = input.required<Ingredient>();
    isClickable = input.required<boolean>();

    constructor(private store: Store<{ ingredients: IngredientsState }>) { }

    onSelect() {
        if (!this.isClickable()) return;

        this.store.dispatch(selectIngredient({ payload: this.ingredient() }));
    }
}
