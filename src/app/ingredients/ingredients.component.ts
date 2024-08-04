import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { Ingredient } from './ingredient/ingredient.model';
import { selectIngredients, selectIngredientsError } from '../store/ingredients/ingredients.selectors';
import { IngredientComponent } from './ingredient/ingredient.component';
import { getIngredients } from '../store/ingredients/ingredients.actions';
import { IngredientsState } from '../store/ingredients/ingredients.reducers';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-ingredients',
    standalone: true,
    imports: [AsyncPipe, IngredientComponent],
    templateUrl: './ingredients.component.html',
    styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent implements OnInit {
    ingredients = signal<Ingredient[]>([]);
    contentLoaded = signal(false);
    errorMessage$: Observable<string> | undefined;

    constructor(private store: Store<{ ingredients: IngredientsState }>) {
        this.errorMessage$ = this.store.select(selectIngredientsError);

        this.store.select(selectIngredients)
            .subscribe((ingredients) => {
                if (ingredients.length) {
                    this.contentLoaded.set(true);
                }

                this.ingredients.set(ingredients);
            });
    }

    ngOnInit() {
        this.store.dispatch(getIngredients());
    }
}
