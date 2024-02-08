import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok/types';
import { FeatureBlok } from './feature-blok.interface';

@Component({
    selector: 'app-feature-blok',
    templateUrl: './feature-blok.component.html',
    styleUrl: './feature-blok.component.css',
    standalone: true,
})
export class FeatureBlokComponent implements StoryblokBlok<FeatureBlok> {
    blok = input.required<FeatureBlok>();
}
