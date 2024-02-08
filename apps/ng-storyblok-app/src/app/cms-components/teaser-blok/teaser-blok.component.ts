import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { TeaserBlok } from './teaser-blok.interface';

@Component({
    selector: 'app-teaser-blok',
    templateUrl: './teaser-blok.component.html',
    styleUrl: './teaser-blok.component.css',
    standalone: true,
})
export class TeaserBlokComponent implements StoryblokBlok<TeaserBlok> {
    blok = input.required<TeaserBlok>();
}
