import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokImgHeightPipe, StoryblokImgWidthPipe, StoryblokSlugPipe } from '@geometricpanda/ng-storyblok/pipes';
import { ImageBlok } from './image-blok.interface';

@Component({
    selector: 'app-image-blok',
    templateUrl: './image-blok.component.html',
    styleUrl: './image-blok.component.css',
    standalone: true,
    imports: [
        NgOptimizedImage,
        StoryblokImgWidthPipe,
        StoryblokImgHeightPipe,
        RouterLink,
        NgTemplateOutlet,
        StoryblokSlugPipe,
        StoryblokSlugPipe,
    ],
    host: {
        '[class.image]': 'true',
    },
})
export class ImageBlokComponent implements StoryblokBlok<ImageBlok> {
    blok = input.required<ImageBlok>();
    image = computed(() => {
        const blok = this.blok();
        if (!blok.asset.filename) {
            return undefined;
        }

        return blok.asset;
    });
}
