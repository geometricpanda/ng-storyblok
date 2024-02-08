import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ISbStory } from 'storyblok-js-client/src/interfaces';
import { Storyblok } from '../services/storyblok.service';
import { NG_STORYBLOK_DEFAULT_PATH } from '../tokens/default-path.token';

export const resolveStory: ResolveFn<ISbStory> = (route) => {
    const storyblok = inject(Storyblok);
    const defaultPath = inject(NG_STORYBLOK_DEFAULT_PATH, { optional: true });

    const { params } = route;
    const { path } = params;

    if (path) {
        return storyblok.getStory(path);
    }

    if (defaultPath) {
        return storyblok.getStory(defaultPath);
    }

    console.error(`ngStoryblok: NO_DEFAULT_PATH_EXEC

ngStoryblok has attempted to resolve a story without a path, however no default path has been provided.
Please provide ngStoryblok with "withDefaultPath()" or verify your route configuration.
`);

    throw new Error('ngStoryblok: NO_DEFAULT_PATH_EXEC');
};
