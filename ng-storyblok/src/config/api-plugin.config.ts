import { Provider } from '@angular/core';
import { apiPlugin } from '@storyblok/js';
import { NG_STORYBLOK_API_PLUGIN } from '../tokens/api-plugin.token';

/**
 * Provides the Storyblok API plugin.
 *
 * @returns The provider for the Storyblok API plugin.
 */
export const withApiPlugin = (): Provider => ({
    provide: NG_STORYBLOK_API_PLUGIN,
    useValue: apiPlugin,
});
