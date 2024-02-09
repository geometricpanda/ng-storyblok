import type { ISbComponentType } from 'storyblok-js-client';

export interface ISbImage extends ISbComponentType<string> {
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    source: string;
    filename?: string;
    copyright: string;
    fieldtype: string;
    meta_data: object;
}
