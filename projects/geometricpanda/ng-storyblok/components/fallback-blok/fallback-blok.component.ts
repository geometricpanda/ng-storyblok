import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { FallbackBlok } from './fallback-blok.interface';

@Component({
    selector: 'storyblok-fallback',
    templateUrl: './fallback-blok.component.html',
    styleUrl: './fallback-blok.component.css',
    standalone: true,
})
export class FallbackBlokComponent implements StoryblokBlok<FallbackBlok> {
    blok = input.required<FallbackBlok>();
}
