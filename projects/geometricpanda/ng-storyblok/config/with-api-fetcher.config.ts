import { NG_STORYBLOK_API_FETCHER } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokApiFetcherFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

/**
 * Provides the Storyblok API region.
 *
 * @param region The Storyblok API region.
 * @returns The provider for the Storyblok API region.
 */
export function withApiFetcher(region: string): NgStoryblokApiFetcherFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ApiFetcherFeature, [
        {
            provide: NG_STORYBLOK_API_FETCHER,
            useValue: region,
        },
    ]);
}
