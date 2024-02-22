import { afterNextRender, ChangeDetectorRef, Component, computed, inject, input, signal } from '@angular/core';
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
            useFactory: () => inject(StoryblokRootComponent).renderData,
        },
    ],
})
export class StoryblokRootComponent {
    cdRef = inject(ChangeDetectorRef);
    BRIDGE = inject(NG_STORYBLOK_BRIDGE, { optional: true });

    story = input.required<ISbStoryData>();
    bridge = signal<undefined | ISbStoryData>(undefined);

    renderData = computed<ISbStoryData>(() => {
        const story = this.story();
        const bridge = this.bridge();
        return bridge ?? story;
    });

    constructor() {
        afterNextRender(() => {
            const story = this.story();
            this.BRIDGE?.(story.id, (next) => {
                this.bridge.set(next);
                this.cdRef.detectChanges();
            });
        });
    }
}
