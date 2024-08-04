import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { checkout, checkoutError, checkoutSuccess } from './cart.actions';
import { CartService } from '../../cart/cart.service';

export const checkout$ = createEffect(
    (
        actions$ = inject(Actions),
        cartService = inject(CartService)
    ): Observable<{ type: string }> => {
        return actions$.pipe(
            ofType(checkout),
            exhaustMap(() => cartService.checkout()
                .pipe(
                    map(() => (checkoutSuccess())),
                    catchError((error: Error) => {
                        return of(checkoutError({ payload: error.message }));
                    })
                ))
        );
    },
    { functional: true }
);