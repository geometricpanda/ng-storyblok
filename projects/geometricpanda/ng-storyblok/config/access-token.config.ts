import { NG_STORYBLOK_ACCESS_TOKEN } from '@geometricpanda/ng-storyblok/tokens';
import {
    NgStoryblokAccessTokenFeature,
    NgStoryblokFeatureKind,
    createNgSbFeature,
} from './_features.config';

/**
 * Provides the Storyblok access token.
 *
 * @param token The Storyblok access token.
 * @returns The provider for the Storyblok access token.
 */
export function withAccessToken(token: string): NgStoryblokAccessTokenFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.AccessTokenFeature, [
        {
            provide: NG_STORYBLOK_ACCESS_TOKEN,
            useValue: token,
        },
    ]);
}
