import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { GridBlok } from './grid-blok.interface';

@Component({
    selector: 'app-grid-blok',
    templateUrl: './grid-blok.component.html',
    styleUrl: './grid-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class GridBlokComponent implements StoryblokBlok<GridBlok> {
    blok = input.required<GridBlok>();
}
