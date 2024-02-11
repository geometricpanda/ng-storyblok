import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { SeparatorBlok } from './separator-blok.interface';

@Component({
    selector: 'app-separator-blok',
    templateUrl: './separator-blok.component.html',
    styleUrl: './separator-blok.component.css',
    standalone: true,
    host: {
        '[class.separator]': 'true',
        '[class.separator--margin-xl]': 'true',
    },
})
export class SeparatorBlokComponent implements StoryblokBlok<SeparatorBlok> {
    blok = input.required<SeparatorBlok>();
}
