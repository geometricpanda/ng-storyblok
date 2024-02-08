import { Component, input } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JsonPipe } from '@angular/common';
import { NgSbBlokDirective } from '@geometricpanda/ng-storyblok/blok';
import { PageBlok } from './page-blok.interface';

@Component({
    selector: 'app-page-blok',
    templateUrl: './page-blok.component.html',
    standalone: true,
    imports: [NgSbBlokDirective, JsonPipe],
})
export class PageBlokComponent {
    blok = input.required<PageBlok>();
}
