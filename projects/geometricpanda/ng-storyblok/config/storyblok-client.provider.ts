import { FactoryProvider, inject } from '@angular/core';
import {
    NG_STORYBLOK_ACCESS_TOKEN,
    NG_STORYBLOK_API_REGION,
    NG_STORYBLOK_BRIDGE,
    NG_STORYBLOK_CACHE,
    NG_STORYBLOK_CLIENT,
    NG_STORYBLOK_OAUTH_TOKEN,
} from '@geometricpanda/ng-storyblok/tokens';
import { apiPlugin, storyblokInit } from '@storyblok/js';

/**
 * Provides the Storyblok API client.
 *
 * @returns The provider for the Storyblok API client.
 */
export const StoryblokClientProvider: FactoryProvider = {
    provide: NG_STORYBLOK_CLIENT,
    useFactory: () => {
        const ACCESS_TOKEN = inject(NG_STORYBLOK_ACCESS_TOKEN, { optional: true });
        const OAUTH_TOKEN = inject(NG_STORYBLOK_OAUTH_TOKEN, { optional: true });
        const API_REGION = inject(NG_STORYBLOK_API_REGION, { optional: true });
        const CACHE = inject(NG_STORYBLOK_CACHE, { optional: true });
        const BRIDGE = inject(NG_STORYBLOK_BRIDGE, { optional: true });

        if (!ACCESS_TOKEN && !OAUTH_TOKEN) {
            throw new Error(`ngStoryblok - NO_ACCESS_TOKEN
No access token or OAuth token provided for the Storyblok API client,
if this is intentional please provide ngStoryblok with
"withAccessToken()" or "withOAuthToken()"`);
        }

        const { storyblokApi } = storyblokInit({
            accessToken: ACCESS_TOKEN ?? undefined,
            use: [apiPlugin],
            bridge: !!BRIDGE,
            apiOptions: {
                oauthToken: OAUTH_TOKEN ?? undefined,
                region: API_REGION ?? undefined,
                cache: CACHE ?? undefined,
            },
        });

        if (!storyblokApi) {
            console.warn(`ngStoryblok - NO_API_CLIENT\nStoryblok API client failed to initialize`);
        }

        return storyblokApi;
    },
};
