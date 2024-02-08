import { FactoryProvider, inject, isDevMode } from '@angular/core';
import {
    NG_STORYBLOK_ACCESS_TOKEN,
    NG_STORYBLOK_API_PLUGIN,
    NG_STORYBLOK_API_REGION,
    NG_STORYBLOK_CACHE_CONFIG,
    NG_STORYBLOK_CLIENT,
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_OAUTH_TOKEN,
} from '@geometricpanda/ng-storyblok/tokens';
import { storyblokInit } from '@storyblok/js';

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
        const API_PLUGIN = inject(NG_STORYBLOK_API_PLUGIN, { optional: true });
        const API_REGION = inject(NG_STORYBLOK_API_REGION, { optional: true });
        const CACHE_CONFIG = inject(NG_STORYBLOK_CACHE_CONFIG, { optional: true });

        if (!ACCESS_TOKEN && !OAUTH_TOKEN) {
            throw new Error(`ngStoryblok - NO_ACCESS_TOKEN

No access token or OAuth token provided for the Storyblok API client,
if this is intentional please provide ngStoryblok with
"withAccessToken()" or "withOAuthToken()"`);
        }

        if (!API_PLUGIN) {
            throw new Error(`ngStoryblok - NO_API_PLUGIN

The Storyblok API plugin is required to initialize the Storyblok API client,
Please provide ngStoryblok with "withApiPlugin()"`);
        }

        if (DEFAULT_PATH === null && isDevMode()) {
            console.error(`ngStoryblok - NO_DEFAULT_PATH

No default path provided for the Storyblok API client,
If this is intentional please provide ngStoryblok with "withoutDefaultPath()"`);
        }

        const { storyblokApi } = storyblokInit({
            apiOptions: {
                accessToken: ACCESS_TOKEN ?? undefined,
                oauthToken: OAUTH_TOKEN ?? undefined,
                region: API_REGION ?? undefined,
                cache: CACHE_CONFIG ?? undefined,
            },
            use: [API_PLUGIN],
        });

        if (!storyblokApi) {
            throw new Error(`ngStoryblok - NO_API_CLIENT

Storyblok API client failed to initialize`);
        }

        return storyblokApi;
    },
};
