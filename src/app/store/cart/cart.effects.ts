import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { checkout, checkoutSuccess } from './cart.actions';

export const checkout$ = createEffect(
    (
        actions$ = inject(Actions)
    ): Observable<{ type: string }> => {
        return actions$.pipe(
            ofType(checkout),
            exhaustMap(() => of('same fake data')
                .pipe(
                    map(() => (checkoutSuccess())),
                    catchError(() => EMPTY)
                ))
        );
    },
    { functional: true }
);