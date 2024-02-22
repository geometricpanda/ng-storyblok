import { InjectionToken } from '@angular/core';
import type { render } from 'squirrelly';
import type { PartialConfig } from 'squirrelly/dist/types/config';
import type { CallbackFn } from 'squirrelly/dist/types/file-handlers';

export interface TitleTemplate {
    template: string;
    render: typeof render;
    env?: PartialConfig;
    cb?: CallbackFn;
}

export const NG_STORYBLOK_TITLE_TEMPLATE = new InjectionToken<TitleTemplate>('NG_STORYBLOK_TITLE_TEMPLATE');
