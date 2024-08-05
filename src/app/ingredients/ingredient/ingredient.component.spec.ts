import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { IngredientComponent } from './ingredient.component';
import { Ingredient } from './ingredient.model';
import { selectIngredient } from '../../store/ingredients/ingredients.actions';

const ingredientStub = {
    id: 1,
    name: 'test',
    selected: false
};
const isClickableStub = false;

describe('IngredientComponent', () => {
    let component: IngredientComponent;
    let fixture: ComponentFixture<IngredientComponent>;
    let store: MockStore<{ ingredients: Ingredient[] }>;
    let ingredientEl: HTMLParagraphElement;

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports: [IngredientComponent],
                providers: [provideMockStore({})],
            })
            .compileComponents();

        fixture = TestBed.createComponent(IngredientComponent);
        store = TestBed.inject(MockStore);
        spyOn(store, 'dispatch').and.callThrough();

        component = fixture.componentInstance;

        fixture.componentRef.setInput('ingredient', ingredientStub);
        fixture.componentRef.setInput('isClickable', isClickableStub);

        fixture.detectChanges();

        const ingredientDe = fixture.debugElement.query(By.css('.ingredient'));
        ingredientEl = ingredientDe.nativeElement;
    });

    describe('default component state', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render ingredient name', () => {
            expect(ingredientEl.innerText).toContain(ingredientStub.name);
        });

        it('should contain appropirate classes', () => {
            expect(ingredientEl.classList).toContain('ingredient');
            expect(ingredientEl.classList).not.toContain('ingredient--selected');
        });
    });

    describe('when ingredient is selected', () => {
        beforeEach(() => {
            fixture.componentRef.setInput(
                'ingredient',
                { ...ingredientStub, selected: true }
            );
            fixture.detectChanges();
        });

        it('should contain appropirate classes', () => {
            expect(ingredientEl.classList).toContain('ingredient');
            expect(ingredientEl.classList).toContain('ingredient--selected');
        });
    });

    describe('clicking on the ingredient', () => {
        describe('when ingredient is NOT clickable', () => {
            beforeEach(() => {
                ingredientEl.click();
            });

            it('should NOT dispatch selectIngredient action', () => {
                expect(store.dispatch).not.toHaveBeenCalled();
            });
        });

        describe('when ingredient is clickable', () => {
            beforeEach(() => {
                fixture.componentRef.setInput('isClickable', !isClickableStub);
                fixture.detectChanges();
                ingredientEl.click();
            });

            it('should dispatch selectIngredient action', () => {
                expect(store.dispatch).toHaveBeenCalled();
                expect(store.dispatch).toHaveBeenCalledWith(selectIngredient({ payload: ingredientStub }));
            });
        });
    });
});