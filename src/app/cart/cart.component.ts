import { Component, OnInit, Signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CartState } from '../store/cart/cart.reducers';
import { checkout, selectCart } from '../store/cart/cart.actions';
import { IngredientComponent } from "../ingredients/ingredient/ingredient.component";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [AsyncPipe, IngredientComponent],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    cart: Signal<CartState>;

    constructor(private store: Store<{ cart: CartState }>) {
        this.cart = toSignal(store.select('cart'), { initialValue: { ingredients: [], totalItems: 0 } });
    }

    ngOnInit() {
        this.store.dispatch(selectCart());
    }

    onCheckout() {
        this.store.dispatch(checkout({ payload: this.cart().ingredients }));
    }
}
