import { NG_STORYBLOK_CACHE } from '@geometricpanda/ng-storyblok/tokens';
import { ISbCache } from 'storyblok-js-client/src/interfaces';
import {
    NgStoryblokCacheFeature,
    NgStoryblokFeatureKind,
    createNgSbFeature,
} from './_features.config';

/**
 * Provides the Storyblok cache configuration.
 *
 * When using Angular SSR, it is recommended to disable the cache.
 * ```ts
 * import { withCacheConfig } from '@geometricpanda/ng-storyblok/config';
 * ...
 * provideNgStoryblok(..., withCacheConfig({type: 'none'}));
 * ```
 *
 * @param config The Storyblok cache configuration.
 * @returns The provider for the Storyblok cache configuration.
 */
export function withCache(): NgStoryblokCacheFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.CacheFeature, [
        {
            provide: NG_STORYBLOK_CACHE,
            useFactory: (): ISbCache => {
                return {
                    type: 'memory',
                };
            },
        },
    ]);
}
