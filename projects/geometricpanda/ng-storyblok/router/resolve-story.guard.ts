import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_PREVIEW,
} from '@geometricpanda/ng-storyblok/tokens';
import { ISbStory } from '@storyblok/js';
import { firstValueFrom } from 'rxjs';

export const resolveStory: ResolveFn<ISbStory> = async (route) => {
    const storyblok = inject(Storyblok);
    const defaultPath = inject(NG_STORYBLOK_DEFAULT_PATH, { optional: true });
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });

    const slug = route.url.map(({ path }) => path).join('/') || defaultPath;

    if (slug) {
        const previewMode = await preview?.preview();
        const req = storyblok.getStory(slug, previewMode);
        return firstValueFrom(req);
    }

    console.error(`ngStoryblok: RESOLVE_STORY_NO_DEFAULT_PATH_EXEC

ngStoryblok has attempted to resolve a story without a path, however no default path has been provided.
Please provide ngStoryblok with "withDefaultPath()" or verify your route configuration.
`);

    throw new Error('ngStoryblok: RESOLVE_STORY_NO_DEFAULT_PATH_EXEC');
};
