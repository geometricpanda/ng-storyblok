import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { TabBlok } from './tab-blok.interface';

@Component({
    selector: 'app-tab-blok',
    templateUrl: './tab-blok.component.html',
    styleUrl: './tab-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class TabBlokComponent implements StoryblokBlok<TabBlok> {
    blok = input.required<TabBlok>();
}
