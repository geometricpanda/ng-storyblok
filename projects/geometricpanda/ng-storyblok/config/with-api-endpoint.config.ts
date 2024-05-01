import { NG_STORYBLOK_API_ENDPOINT } from '../tokens/api-endpoint.token';
import { NgStoryblokApiEndpointFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

/**
 * Provides a custom Storyblok endpoint URL. API Region provider will have no affect if this is set.
 *
 * @param endpoint The Storyblok API endpoint base URL.
 * @returns The provider for the Storyblok API custom endpoint.
 */
export function withApiEndpoint(endpoint: string): NgStoryblokApiEndpointFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ApiEndpointFeature, [
        {
            provide: NG_STORYBLOK_API_ENDPOINT,
            useValue: endpoint,
        },
    ]);
}
