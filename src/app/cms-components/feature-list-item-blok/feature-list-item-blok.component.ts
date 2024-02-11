import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { NgGlyph, NgIcon } from '@ng-icons/core';
import { FeatureListItemBlok } from './feature-list-item-blok.interface';

@Component({
    selector: 'app-feature-list-item-blok',
    templateUrl: './feature-list-item-blok.component.html',
    styleUrl: './feature-list-item-blok.component.css',
    standalone: true,
    imports: [NgGlyph, NgIcon, StoryblokBlokDirective],
})
export class FeatureListItemBlokComponent implements StoryblokBlok<FeatureListItemBlok> {
    blok = input.required<FeatureListItemBlok>();
}
