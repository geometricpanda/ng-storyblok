import { InjectionToken, Signal } from '@angular/core';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

/**
 * The token for the Storyblok cache.
 */
export const NG_STORYBLOK_BRIDGE = new InjectionToken<(story: Signal<ISbStoryData>) => Signal<ISbStoryData>>(
    'NG_STORYBLOK_BRIDGE',
);
