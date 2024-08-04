import { Injectable } from '@angular/core';

import { of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    checkout() {
        
        const randomNumber = Math.random();
        console.log(randomNumber);
        if (randomNumber < 0.1) {
            return throwError(() => new Error('Something went wrong. Please try again.'));
        }

        return of({ success: true });
    }
}
