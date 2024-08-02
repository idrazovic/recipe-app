import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from './ingredient/ingredient.model';
import { selectIngredients } from '../store/ingredients/ingredients.selectors';
import { IngredientComponent } from './ingredient/ingredient.component';
import { getIngredients } from '../store/ingredients/ingredients.actions';

@Component({
    selector: 'app-ingredients',
    standalone: true,
    imports: [AsyncPipe, IngredientComponent],
    templateUrl: './ingredients.component.html',
    styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent implements OnInit {
    ingredients$: Observable<Ingredient[]>;

    constructor(private store: Store<{ ingredients: Ingredient[] }>) {
        this.ingredients$ = this.store.select(selectIngredients);
    }

    ngOnInit() {
        this.store.dispatch(getIngredients());
    }
}
