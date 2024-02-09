import { InjectionToken } from '@angular/core';
import type { apiPlugin } from '@storyblok/js';

/**
 * Injection token for the Storyblok API plugin.
 */
export const NG_STORYBLOK_API_PLUGIN = new InjectionToken<typeof apiPlugin>(
    'NG_STORYBLOK_API_PLUGIN',
);
