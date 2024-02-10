import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { HeroBlok } from './hero-blok.interface';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';

@Component({
    selector: 'app-hero-blok',
    templateUrl: './hero-blok.component.html',
    styleUrl: './hero-blok.component.scss',
    standalone: true,
    imports: [
        StoryblokBlokDirective,
    ],
})
export class HeroBlokComponent implements StoryblokBlok<HeroBlok> {
    blok = input.required<HeroBlok>();
}
