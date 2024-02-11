import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { PageBlok } from './page-blok.interface';

@Component({
    selector: 'app-page-blok',
    templateUrl: './page-blok.component.html',
    styleUrl: './page-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class PageBlokComponent implements StoryblokBlok<PageBlok> {
    blok = input.required<PageBlok>();
}
