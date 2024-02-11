import { InjectionToken } from '@angular/core';

export type SlugRewrite = (slug: string) => string;

export const NG_STORYBLOK_SLUG_REWRITE = new InjectionToken<SlugRewrite>('NG_STORYBLOK_SLUG_REWRITE');
