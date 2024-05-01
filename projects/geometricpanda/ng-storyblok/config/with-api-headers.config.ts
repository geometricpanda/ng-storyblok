import { NG_STORYBLOK_API_HEADERS } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokApiHeadersFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

/**
 * Provides the Storyblok API Headers
 *
 * @param headers The Storyblok API headers.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withApiHeaders(headers: any): NgStoryblokApiHeadersFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ApiHeadersFeature, [
        {
            provide: NG_STORYBLOK_API_HEADERS,
            useValue: headers,
        },
    ]);
}
