import { InjectionToken } from '@angular/core';
import { ISbCache } from 'storyblok-js-client/src/interfaces';

/**
 * The token for the Storyblok cache.
 */
export const NG_STORYBLOK_CACHE = new InjectionToken<ISbCache>('NG_STORYBLOK_CACHE');
export const NG_STORYBLOK_TRANSFER_CACHE = new InjectionToken<boolean>(
    'NG_STORYBLOK_TRANSFER_CACHE',
);
