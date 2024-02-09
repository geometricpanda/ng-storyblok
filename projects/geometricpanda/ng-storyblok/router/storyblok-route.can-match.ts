import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_PREVIEW,
} from '@geometricpanda/ng-storyblok/tokens';
import { firstValueFrom } from 'rxjs';

export const matchStoryblokRoute: CanMatchFn = async (route, segments) => {
    const storyblok = inject(Storyblok);
    const defaultPath = inject(NG_STORYBLOK_DEFAULT_PATH, { optional: true });
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });

    const slug = segments.length ? segments.map((segment) => segment.path).join('/') : defaultPath;

    if (slug !== null) {
        const previewMode = await preview?.preview();
        const req = storyblok.getStory(slug, previewMode);
        return firstValueFrom(req).then((story) => !!story);
    }

    console.error(`ngStoryblok: CAN_MATCH_NO_DEFAULT_PATH_EXEC

ngStoryblok has attempted to match a story without a path, however no default path has been provided.
Please provide ngStoryblok with "withDefaultPath()" or verify your route configuration.
`);

    throw new Error('ngStoryblok: CAN_MATCH_NO_DEFAULT_PATH_EXEC');
};
