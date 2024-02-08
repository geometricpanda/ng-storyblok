import { FactoryProvider, inject } from '@angular/core';
import {
    NG_STORYBLOK_ACCESS_TOKEN,
    NG_STORYBLOK_API_PLUGIN,
    NG_STORYBLOK_API_REGION,
    NG_STORYBLOK_CACHE_CONFIG,
    NG_STORYBLOK_CLIENT,
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
        const ACCESS_TOKEN = inject(NG_STORYBLOK_ACCESS_TOKEN, { optional: true });
        const OAUTH_TOKEN = inject(NG_STORYBLOK_OAUTH_TOKEN, { optional: true });
        const API_PLUGIN = inject(NG_STORYBLOK_API_PLUGIN, { optional: true });
        const API_REGION = inject(NG_STORYBLOK_API_REGION, { optional: true });
        const CACHE_CONFIG = inject(NG_STORYBLOK_CACHE_CONFIG, { optional: true });

        if (!ACCESS_TOKEN && !OAUTH_TOKEN) {
            throw new Error('A Storyblok access/oauth token is required to initialize the Storyblok API client');
        }

        if (!API_PLUGIN) {
            throw new Error('Storyblok API plugin is required to initialize the Storyblok API client');
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
            throw new Error('Storyblok API client failed to initialize');
        }

        return storyblokApi;
    },
};
