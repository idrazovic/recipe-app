import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { defer, of, throwError } from 'rxjs';

import { IngredientsService } from './ingredients.service';

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

    afterEach(() => {
        httpClientSpy.get.calls.reset();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAll()', () => {
        describe('when no selectedIngredientsIds in localStorage', () => {
            beforeEach(() => {
                localStorage.removeItem('selectedIngredientsIds');
                httpClientSpy.get.and.returnValue(of(ingredientsStub));
            });

            afterEach(() => {
                httpClientSpy.get.calls.reset();
            });

            it('should get all ingredients', (done: DoneFn) => {
                service.getAll().subscribe(res => {
                    expect(res).toEqual(ingredientsStub.ingredients);
                    res.forEach(ingredient => expect(ingredient.selected).toBeFalse());
                    done();
                });
            });
        })

        describe('when selectedIngredientsIds in localStorage', () => {
            beforeEach(() => {
                localStorage.setItem('selectedIngredientsIds', '[1]');
                httpClientSpy.get.and.returnValue(of(ingredientsStub));
            });

            afterEach(() => {
                localStorage.removeItem('selectedIngredientsIds');
                httpClientSpy.get.calls.reset();
            });

            it('should get all ingredients', (done: DoneFn) => {
                service.getAll().subscribe(res => {
                    res.forEach(ingredient => {
                        if (ingredient.id === 1) {
                            expect(ingredient.selected).toBeTrue();
                        } else {
                            expect(ingredient.selected).toBeFalse();
                        }
                    });
                    ;
                    done();
                });
            });
        });

        describe('when http call fails', () => {
            beforeEach(() => {
                const errorResponse = new HttpErrorResponse({
                    error: { code: `some code`, message: `Something went wrong. Please try again.` },
                    status: 500,
                    statusText: 'Internal Server Error',
                });
                httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
            })

            afterEach(() => {
                httpClientSpy.get.calls.reset();
            });

            it('should throw an error', () => {
                service.getAll().subscribe({
                    error: (err: HttpErrorResponse) => {
                        expect(err.error).not.toBeNull();
                        expect(err.error.message).toEqual('Something went wrong. Please try again.');
                        expect(err.error.code).toEqual('some code');
                        expect(err.status).toEqual(500);
                        expect(err.statusText).toEqual('Internal Server Error');
                    }
                })
            });
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

function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

