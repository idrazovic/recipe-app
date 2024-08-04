import { Injectable } from '@angular/core';

import { of, throwError } from 'rxjs';

import { CartState } from '../store/cart/cart.reducers';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    checkout() {
        
        const randomNumber = Math.random();
        console.log(randomNumber);
        if (randomNumber < 0.5) {
            return throwError(() => new Error('Something went wrong. Please try again.'));
        }

        return of({ success: true });
    }
}
