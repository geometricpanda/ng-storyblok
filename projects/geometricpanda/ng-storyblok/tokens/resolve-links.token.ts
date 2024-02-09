import { InjectionToken } from '@angular/core';
import { ISbStoryParams } from 'storyblok-js-client/src/interfaces';

/**
 * Injection token for the Storyblok API region.
 */
export const NG_STORYBLOK_RESOLVE_LINKS = new InjectionToken<ISbStoryParams['resolve_links']>(
    'NG_STORYBLOK_RESOLVE_LINKS',
);
