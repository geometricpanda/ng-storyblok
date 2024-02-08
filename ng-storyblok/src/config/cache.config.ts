import { Provider } from '@angular/core';
import { NG_STORYBLOK_CACHE_CONFIG } from '@geometricpanda/ng-storyblok/tokens';
import type { ISbCache } from 'storyblok-js-client/src/interfaces';

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
export const withCacheConfig = (config: ISbCache): Provider => ({
    provide: NG_STORYBLOK_CACHE_CONFIG,
    useValue: config,
});
