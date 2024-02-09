import { NG_STORYBLOK_OAUTH_TOKEN } from '@geometricpanda/ng-storyblok/tokens';
import {
    createNgSbFeature,
    NgStoryblokFeatureKind,
    NgStoryblokOAuthTokenFeature,
} from './_features.config';

/**
 * Provides the Storyblok OAuth token.
 *
 * @param token The Storyblok OAuth token.
 * @returns The provider for the Storyblok OAuth token.
 */
export function withOAuthToken(token: string): NgStoryblokOAuthTokenFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.OAuthTokenFeature, [
        {
            provide: NG_STORYBLOK_OAUTH_TOKEN,
            useValue: token,
        },
    ]);
}
