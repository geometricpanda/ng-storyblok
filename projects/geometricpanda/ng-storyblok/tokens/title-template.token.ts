import { InjectionToken } from '@angular/core';

export interface TitleTemplate {
    template: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (template: string, data: Record<string, any>) => string;
}

export const NG_STORYBLOK_TITLE_TEMPLATE = new InjectionToken<TitleTemplate>('NG_STORYBLOK_TITLE_TEMPLATE');
