import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { SectionBlok } from './section-blok.interface';

@Component({
    selector: 'app-section-blok',
    templateUrl: './section-blok.component.html',
    styleUrl: './section-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class SectionBlokComponent implements StoryblokBlok<SectionBlok> {
    blok = input.required<SectionBlok>();
}
