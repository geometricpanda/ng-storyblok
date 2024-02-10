import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { RichtextComponent } from '@geometricpanda/ng-storyblok/components/richtext';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { RichtextBlok } from './richtext-blok.interface';

@Component({
    selector: 'app-richtext-blok',
    templateUrl: './richtext-blok.component.html',
    styleUrl: './richtext-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective, RichtextComponent],
    host: {
        '[class.rich-text]': 'true',
    },
})
export class RichtextBlokComponent implements StoryblokBlok<RichtextBlok> {
    blok = input.required<RichtextBlok>();
}
