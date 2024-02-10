import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { TextBlok } from './text-blok.interface';

@Component({
    selector: 'app-text-blok',
    templateUrl: './text-blok.component.html',
    styleUrl: './text-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
    host:{
        '[class.text-blok]': 'true',
        '[class.text-blok--style-headline]': 'blok().style === "headline"',
        '[class.text-blok--style-strapline]': 'blok().style === "strapline"',
        '[class.text-blok--style-title]': 'blok().style === "title"',
        '[class.text-blok--style-subtitle]': 'blok().style === "subtitle"',
        '[class.text-blok--style-lead]': 'blok().style === "lead"',
        '[class.text-blok--style-paragraph]': 'blok().style === "paragraph"',
        '[class.text-blok--style-small]': 'blok().style === "small"',

    }
})
export class TextBlokComponent implements StoryblokBlok<TextBlok> {

    blok = input.required<TextBlok>();

}
