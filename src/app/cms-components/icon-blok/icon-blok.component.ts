import { Component, input } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { NgIcon } from '@ng-icons/core';
import { IconBlok } from './icon-blok.interface';

@Component({
    selector: 'app-icon-blok',
    templateUrl: './icon-blok.component.html',
    styleUrl: './icon-blok.component.css',
    standalone: true,
    imports: [NgIcon],
    host: {
        '[class.icon]': 'true',
        '[class.icon--color-info]': 'blok().color === "info"',
        '[class.icon--color-warning]': 'blok().color === "warning"',
        '[class.icon--color-danger]': 'blok().color === "danger"',
        '[class.icon--color-success]': 'blok().color === "success"',
        '[class.icon--color-light]': 'blok().color === "light"',
        '[class.icon--color-dark]': 'blok().color === "dark"',
        '[class.icon--color-inherit]': 'blok().color === "inherit"',
        '[class.icon--size-1x]': 'blok().size === "1"',
        '[class.icon--size-1point5x]': 'blok().size === "1.5"',
        '[class.icon--size-2x]': 'blok().size === "2"',
        '[class.icon--size-3x]': 'blok().size === "3"',
    },
})
export class IconBlokComponent implements StoryblokBlok<IconBlok> {
    blok = input.required<IconBlok>();
}
