import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { FeatureListBlok } from './feature-list-blok.interface';

@Component({
    selector: 'app-feature-list-blok',
    templateUrl: './feature-list-blok.component.html',
    styleUrls: ['./feature-list-blok.component.scss'],
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class FeatureListBlokComponent implements StoryblokBlok<FeatureListBlok> {
    blok = input.required<FeatureListBlok>();
}
