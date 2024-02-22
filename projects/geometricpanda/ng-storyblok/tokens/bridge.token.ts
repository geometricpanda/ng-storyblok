import { InjectionToken } from '@angular/core';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

export type BridgeCallback = (data: ISbStoryData) => void;

/**
 * The token for the Storyblok cache.
 */
export const NG_STORYBLOK_BRIDGE = new InjectionToken<(id: number, target: BridgeCallback) => void>(
    'NG_STORYBLOK_BRIDGE',
);
