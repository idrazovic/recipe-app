import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { IngredientsComponent } from './ingredients.component';

describe('IngredientsComponent', () => {
    let component: IngredientsComponent;
    let fixture: ComponentFixture<IngredientsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IngredientsComponent],
            providers: [
                provideMockStore({}),
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(IngredientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});