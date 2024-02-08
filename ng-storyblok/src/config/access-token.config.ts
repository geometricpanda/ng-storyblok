import { Provider } from '@angular/core';
import { NG_STORYBLOK_ACCESS_TOKEN } from '@geometricpanda/ng-storyblok/tokens';

/**
 * Provides the Storyblok access token.
 *
 * @param token The Storyblok access token.
 * @returns The provider for the Storyblok access token.
 */
export const withAccessToken = (token: string): Provider => ({
    provide: NG_STORYBLOK_ACCESS_TOKEN,
    useValue: token,
});
