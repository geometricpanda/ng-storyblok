import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStoryblokComponent } from './ng-storyblok.component';

describe('NgStoryblokComponent', () => {
    let component: NgStoryblokComponent;
    let fixture: ComponentFixture<NgStoryblokComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgStoryblokComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NgStoryblokComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
