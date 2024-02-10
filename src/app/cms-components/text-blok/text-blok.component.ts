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
        '[class.text-blok--gradient]': 'blok().gradient',
        '[class.text-blok--style-t100]': 'blok().style === "t100"',
        '[class.text-blok--style-t200]': 'blok().style === "t200"',
        '[class.text-blok--style-t300]': 'blok().style === "t300"',
        '[class.text-blok--style-t400]': 'blok().style === "t400"',
        '[class.text-blok--style-t500]': 'blok().style === "t500"',
        '[class.text-blok--style-t600]': 'blok().style === "t600"',
        '[class.text-blok--style-t700]': 'blok().style === "t700"',
        '[class.text-blok--style-t800]': 'blok().style === "t800"',
        '[class.text-blok--style-t900]': 'blok().style === "t900"',
    }
})
export class TextBlokComponent implements StoryblokBlok<TextBlok> {

    blok = input.required<TextBlok>();

}
