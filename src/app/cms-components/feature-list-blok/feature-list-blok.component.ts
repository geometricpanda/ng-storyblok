import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { SlicePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { ButtonComponent } from '../../common/button';
import { FeatureListBlok } from './feature-list-blok.interface';

@Component({
    selector: 'app-feature-list-blok',
    templateUrl: './feature-list-blok.component.html',
    styleUrl: './feature-list-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective, SlicePipe, ButtonComponent],
    host: {
        '[class.feature-list]': 'true',
    },
    animations: [
        trigger('filterAnimation', [
            transition(':increment', [
                query(
                    ':enter',
                    [style({ opacity: 0 }), stagger(50, [animate('300ms ease-out', style({ opacity: 1 }))])],
                    { optional: true },
                ),
            ]),
        ]),
    ],
})
export class FeatureListBlokComponent implements StoryblokBlok<FeatureListBlok> {
    blok = input.required<FeatureListBlok>();

    limit = signal<number>(5);

    features = computed(() => {
        const blok = this.blok();
        const limit = this.limit();
        return blok.children.slice(0, limit);
    });

    handleClick() {
        const blok = this.blok();
        const length = blok.children.length;
        this.limit.set(length);
    }
}
