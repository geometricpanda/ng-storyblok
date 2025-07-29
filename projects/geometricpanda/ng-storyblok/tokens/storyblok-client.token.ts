import { InjectionToken } from '@angular/core';
import type { StoryblokClient } from '@storyblok/js';

/**
 * Injection token for the Storyblok client.
 */
export const NG_STORYBLOK_CLIENT = new InjectionToken<StoryblokClient>('NG_STORYBLOK_CLIENT');
