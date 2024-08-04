import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { IngredientsService } from './ingredients.service';
import { ErrorHandlerService } from '../shared/error-handler.service';

const ingredientsStub = {
    ingredients: [
        { id: 1, name: 'test', selected: false },
        { id: 2, name: 'test2', selected: false }
    ]
};

describe('IngredientsService', () => {
    let service: IngredientsService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new IngredientsService(httpClientSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAll()', () => {
        it('should get all ingredients', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(ingredientsStub));

            service.getAll().subscribe(res => {
                expect(res).toEqual(ingredientsStub.ingredients);
                done();
            });

            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateSelectedIngredientInLocaleStorage()', () => {
        beforeEach(() => {
            service.updateSelectedIngredientInLocaleStorage(ingredientsStub.ingredients[0]);
        });

        afterEach(() => {
            localStorage.removeItem('selectedIngredientsIds');
        });

        it('should update selected ingredients in localStorage', () => {
            expect(localStorage.getItem('selectedIngredientsIds')).toEqual('[1]');
        });
    });
});

