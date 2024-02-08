import { Component, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok/types';
import { PageBlok } from './page-blok.interface';

@Component({
    selector: 'app-page-blok',
    templateUrl: './page-blok.component.html',
    styleUrl: './page-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective],
})
export class PageBlokComponent implements StoryblokBlok<PageBlok> {
    title = inject(Title);

    blok = input.required<PageBlok>();

    ngOnInit() {
        this.title.setTitle(this.blok().name);
    }
}
