import { InjectionToken, Signal } from '@angular/core';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

/**
 * Injection token for the Storyblok client.
 */
export const NG_STORYBLOK_ROOT = new InjectionToken('NG_STORYBLOK_ROOT');
export const NG_STORYBLOK_CONTEXT = new InjectionToken<Signal<ISbStoryData>>('NG_STORYBLOK_CONTEXT');
