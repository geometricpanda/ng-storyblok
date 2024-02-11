import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { HeroBlok } from './hero-blok.interface';

@Component({
    selector: 'app-hero-blok',
    templateUrl: './hero-blok.component.html',
    styleUrl: './hero-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class HeroBlokComponent implements StoryblokBlok<HeroBlok> {
    blok = input.required<HeroBlok>();
}
