import { InjectionToken } from '@angular/core';

export type RewriteFn = (slug: string) => string;

export interface SlugRewrite {
    toStory: RewriteFn;
    toUrl: RewriteFn;
}

export const NG_STORYBLOK_SLUG_REWRITE = new InjectionToken<SlugRewrite>('NG_STORYBLOK_SLUG_REWRITE');
