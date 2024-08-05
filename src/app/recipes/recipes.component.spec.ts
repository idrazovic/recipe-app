import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
    let component: RecipesComponent;
    let fixture: ComponentFixture<RecipesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipesComponent],
            providers: [provideMockStore({})],
        })
            .compileComponents();

        fixture = TestBed.createComponent(RecipesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
