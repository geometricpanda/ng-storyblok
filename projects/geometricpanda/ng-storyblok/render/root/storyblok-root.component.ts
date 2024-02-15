import { Component, computed, inject, input } from '@angular/core';
import { NG_STORYBLOK_BRIDGE, NG_STORYBLOK_CONTEXT } from '@geometricpanda/ng-storyblok/tokens';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';
import { StoryblokContentDirective } from '../render';

@Component({
    selector: 'storyblok-root',
    templateUrl: './storyblok-root.component.html',
    standalone: true,
    imports: [StoryblokContentDirective],
    providers: [
        {
            provide: NG_STORYBLOK_CONTEXT,
            useFactory: () => inject(StoryblokRootComponent).storyData,
        },
    ],
})
export class StoryblokRootComponent {
    BRIDGE = inject(NG_STORYBLOK_BRIDGE, { optional: true });

    story = input.required<ISbStoryData>();
    storyData = computed(() => {
        if (!this.BRIDGE) {
            return this.story();
        }

        const bridge = this.BRIDGE(this.story);
        return bridge();
    });
}
