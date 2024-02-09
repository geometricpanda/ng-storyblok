import { InjectionToken } from '@angular/core';
import { ISbStoryParams } from 'storyblok-js-client/src/interfaces';

export interface StoryblokPreview {
    preview: () => Promise<undefined | Partial<ISbStoryParams>>;
}

/**
 * Injection token for the Storyblok Preview functionality.
 */
export const NG_STORYBLOK_PREVIEW = new InjectionToken<StoryblokPreview>('NG_STORYBLOK_PREVIEW');
