import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import {
    NG_STORYBLOK_BRIDGE,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
} from '@geometricpanda/ng-storyblok/tokens';
import { useStoryblokBridge } from '@storyblok/js';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';
import { createNgSbFeature, NgStoryblokBridgeFeature, NgStoryblokFeatureKind } from './_features.config';

export function withBridge(): NgStoryblokBridgeFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.BridgeFeature, [
        {
            provide: NG_STORYBLOK_BRIDGE,
            useFactory: () => {
                const resolveRelations = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true });
                const resolveLinks = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true });
                const platform = inject(PLATFORM_ID);

                return (storyData: Signal<ISbStoryData>) => {
                    const story = storyData();
                    const bridgeData = signal<ISbStoryData>(story);

                    if (isPlatformBrowser(platform)) {
                        useStoryblokBridge(story.id, (story) => bridgeData.set(story), {
                            resolveRelations: resolveRelations ?? undefined,
                            resolveLinks: resolveLinks ?? undefined,
                        });
                    }

                    return bridgeData;
                };
            },
        },
    ]);
}
