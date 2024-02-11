import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { FeatureListBlok } from './feature-list-blok.interface';

@Component({
    selector: 'app-feature-list-blok',
    templateUrl: './feature-list-blok.component.html',
    styleUrl: './feature-list-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class FeatureListBlokComponent implements StoryblokBlok<FeatureListBlok> {
    blok = input.required<FeatureListBlok>();
}
