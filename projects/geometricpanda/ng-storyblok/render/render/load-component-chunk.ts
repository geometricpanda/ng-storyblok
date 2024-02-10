import { Type } from '@angular/core';
import { DefaultExport } from '@angular/router';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { BlokLoader, BlokLoaders } from '@geometricpanda/ng-storyblok/tokens';
import { ISbComponentType } from 'storyblok-js-client';

const isWrappedDefaultExport = <T>(value: T | DefaultExport<T>): value is DefaultExport<T> =>
    value && typeof value === 'object' && 'default' in value;

const maybeUnwrapDefaultExport = <T>(input: T | DefaultExport<T>): T =>
    isWrappedDefaultExport(input) ? input['default'] : input;

export interface RenderOptions {
    loaders: BlokLoaders;
    fallbackLoader: BlokLoader;
    blok: ISbComponentType<string>;
}

export const loadComponentChunk = async ({ loaders, blok, fallbackLoader }: RenderOptions) => {
    if (!blok.component) {
        console.error(
            `ngStoryblok - NO_BLOK_COMPONENT

The blok does not have a component defined.
`,
            blok,
        );
        throw new Error('ngStoryblok - NO_BLOK_COMPONENT');
    }

    const loader = loaders[blok.component];

    if (!loader) {
        const chunk = await fallbackLoader();
        return maybeUnwrapDefaultExport(chunk) as Type<StoryblokBlok>;
    }

    const chunk = await loader();
    return maybeUnwrapDefaultExport(chunk) as Type<StoryblokBlok>;
};
