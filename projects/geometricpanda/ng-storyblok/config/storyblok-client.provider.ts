import { FactoryProvider, inject, isDevMode } from '@angular/core';
import {
    NG_STORYBLOK_ACCESS_TOKEN,
    NG_STORYBLOK_API_REGION,
    NG_STORYBLOK_CLIENT,
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_OAUTH_TOKEN,
} from '@geometricpanda/ng-storyblok/tokens';
import StoryblokClient from 'storyblok-js-client';

/**
 * Provides the Storyblok API client.
 *
 * @returns The provider for the Storyblok API client.
 */
export const StoryblokClientProvider: FactoryProvider = {
    provide: NG_STORYBLOK_CLIENT,
    useFactory: () => {
        const DEFAULT_PATH = inject(NG_STORYBLOK_DEFAULT_PATH, { optional: true });
        const ACCESS_TOKEN = inject(NG_STORYBLOK_ACCESS_TOKEN, { optional: true });
        const OAUTH_TOKEN = inject(NG_STORYBLOK_OAUTH_TOKEN, { optional: true });
        const API_REGION = inject(NG_STORYBLOK_API_REGION, { optional: true });

        if (!ACCESS_TOKEN && !OAUTH_TOKEN) {
            throw new Error(`ngStoryblok - NO_ACCESS_TOKEN

No access token or OAuth token provided for the Storyblok API client,
if this is intentional please provide ngStoryblok with
"withAccessToken()" or "withOAuthToken()"`);
        }

        if (DEFAULT_PATH === null && isDevMode()) {
            console.error(`ngStoryblok - NO_DEFAULT_PATH

No default path provided for the Storyblok API client,
If this is intentional please provide ngStoryblok with "withoutDefaultPath()"`);
        }

        const storyblokApi = new StoryblokClient({
            accessToken: ACCESS_TOKEN ?? undefined,
            oauthToken: OAUTH_TOKEN ?? undefined,
            region: API_REGION ?? undefined,
        });

        if (!storyblokApi) {
            throw new Error(`ngStoryblok - NO_API_CLIENT

Storyblok API client failed to initialize`);
        }

        return storyblokApi;
    },
};