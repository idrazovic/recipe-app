import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { RecipeComponent } from './recipe.component';

describe('RecipeComponent', () => {
    let component: RecipeComponent;
    let fixture: ComponentFixture<RecipeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipeComponent],
            providers: [provideMockStore({}),]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecipeComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('recipe', {
            id: 1,
            name: 'test',
            ingredients: [],
            ingredientIds: [],
        })
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
