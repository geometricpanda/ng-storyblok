import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokImgHeightPipe, StoryblokImgWidthPipe } from '@geometricpanda/ng-storyblok/pipes';
import { TeaserBlok } from './teaser-blok.interface';

@Component({
    selector: 'app-teaser-blok',
    templateUrl: './teaser-blok.component.html',
    styleUrl: './teaser-blok.component.css',
    standalone: true,
    imports: [NgOptimizedImage, StoryblokImgWidthPipe, StoryblokImgHeightPipe, JsonPipe],
})
export class TeaserBlokComponent implements StoryblokBlok<TeaserBlok> {
    blok = input.required<TeaserBlok>();
}
