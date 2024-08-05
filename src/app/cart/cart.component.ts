import { Component, OnInit, signal, Signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { CartState } from '../store/cart/cart.reducers';
import { checkout, selectCart } from '../store/cart/cart.actions';
import { IngredientComponent } from "../ingredients/ingredient/ingredient.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [AsyncPipe, IngredientComponent],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    cart: Signal<CartState> = signal({ ingredients: [], totalItems: 0, errorMessage: '' });

    constructor(private store: Store<{ cart: CartState }>) {
        const initialCartState = { ingredients: [], totalItems: 0, errorMessage: '' };
        this.cart = toSignal(store.select('cart'), { initialValue: initialCartState });
    }

    ngOnInit() {
        this.store.dispatch(selectCart());
    }

    onCheckout() {
        this.store.dispatch(checkout({ payload: this.cart().ingredients }));
    }
}
