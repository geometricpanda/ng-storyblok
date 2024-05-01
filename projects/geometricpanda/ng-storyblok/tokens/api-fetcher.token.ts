import { InjectionToken } from '@angular/core';

/**
 * Injection token for the Storyblok API Fetcher.
 */
export const NG_STORYBLOK_API_FETCHER = new InjectionToken<typeof fetch>('NG_STORYBLOK_API_FETCHER');
