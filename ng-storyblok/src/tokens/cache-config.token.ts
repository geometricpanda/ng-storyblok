import { InjectionToken } from '@angular/core';
import type { ISbCache } from 'storyblok-js-client/src/interfaces';

/**
 * Injection token for the Storyblok cache configuration.
 */
export const NG_STORYBLOK_CACHE_CONFIG = new InjectionToken<ISbCache>('NG_STORYBLOK_CACHE_CONFIG');
