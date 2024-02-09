import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject, input, signal } from '@angular/core';
import {
    NG_STORYBLOK_BRIDGE,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
} from '@geometricpanda/ng-storyblok/tokens';
import { ISbStory, useStoryblokBridge } from '@storyblok/js';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';
import { StoryblokContentDirective } from '../render';

@Component({
    selector: 'storyblok-root',
    templateUrl: './storyblok-root.component.html',
    standalone: true,
    imports: [StoryblokContentDirective, AsyncPipe],
})
export class StoryblokRootComponent {
    PLATFORM_ID = inject(PLATFORM_ID);
    BRIDGE = inject(NG_STORYBLOK_BRIDGE, { optional: true });
    RESOLVE_RELATIONS = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true }) ?? undefined;
    RESOLVE_LINKS = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true }) ?? undefined;

    story = input.required<ISbStory>();
    bridgeStory = signal<ISbStoryData | undefined>(undefined);

    computedStory = computed<ISbStoryData>(() => {
        const bridgeStory = this.bridgeStory();
        const story = this.story();

        if (bridgeStory) {
            return bridgeStory;
        }

        return story.data.story;
    });

    onStory = effect(
        () => {
            const story = this.story();
            const bridge = this.BRIDGE;
            const platformBrowser = isPlatformBrowser(this.PLATFORM_ID);

            if (platformBrowser && bridge) {
                useStoryblokBridge(story.data.story.id, (newStory) => this.bridgeStory.set(newStory), {
                    resolveRelations: this.RESOLVE_RELATIONS,
                    resolveLinks: this.RESOLVE_LINKS,
                });
            }
        },
        { allowSignalWrites: true },
    );
}
