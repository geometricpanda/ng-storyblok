import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { StickyBlok } from './sticky-blok.interface';

@Component({
    selector: 'app-sticky-blok',
    templateUrl: './sticky-blok.component.html',
    styleUrl: './sticky-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class StickyBlokComponent implements StoryblokBlok<StickyBlok> {
    blok = input.required<StickyBlok>();
}
