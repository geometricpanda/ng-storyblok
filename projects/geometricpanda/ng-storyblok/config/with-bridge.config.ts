import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import {
    BridgeCallback,
    NG_STORYBLOK_BRIDGE,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
} from '@geometricpanda/ng-storyblok/tokens';
import { useStoryblokBridge } from '@storyblok/js';
import { createNgSbFeature, NgStoryblokBridgeFeature, NgStoryblokFeatureKind } from './_features.config';

export function withBridge(): NgStoryblokBridgeFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.BridgeFeature, [
        {
            provide: NG_STORYBLOK_BRIDGE,
            useFactory: () => {
                const resolveRelations = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true });
                const resolveLinks = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true });
                const platform = inject(PLATFORM_ID);
                return (id: number, callback: BridgeCallback) => {
                    if (isPlatformBrowser(platform)) {
                        useStoryblokBridge(id, (story) => callback(story), {
                            resolveRelations: resolveRelations ?? undefined,
                            resolveLinks: resolveLinks ?? undefined,
                        });
                    }
                };
            },
        },
    ]);
}
