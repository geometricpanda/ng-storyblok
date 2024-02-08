import { Provider } from '@angular/core';
import { NG_STORYBLOK_OAUTH_TOKEN } from '@geometricpanda/ng-storyblok/tokens';

/**
 * Provides the Storyblok OAuth token.
 *
 * @param token The Storyblok OAuth token.
 * @returns The provider for the Storyblok OAuth token.
 */
export const withOAuthToken = (token: string): Provider => ({
    provide: NG_STORYBLOK_OAUTH_TOKEN,
    useValue: token,
});
