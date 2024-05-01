import { NG_STORYBLOK_API_FETCHER } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokApiFetcherFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

/**
 * Provides the Storyblok API region.
 *
 * @param fetcher The Storyblok API fetcher
 * @returns The provider for the Storyblok API region.
 */
export function withApiFetcher(fetcher: typeof fetch): NgStoryblokApiFetcherFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ApiFetcherFeature, [
        {
            provide: NG_STORYBLOK_API_FETCHER,
            useValue: fetcher,
        },
    ]);
}
