import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_PREVIEW,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
} from '@geometricpanda/ng-storyblok/tokens';
import { ISbStory } from '@storyblok/js';
import { firstValueFrom } from 'rxjs';

export const resolveStory: ResolveFn<ISbStory> = async (route) => {
    const storyblok = inject(Storyblok);
    const defaultPath = inject(NG_STORYBLOK_DEFAULT_PATH);
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });

    const resolveLinks = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true }) ?? undefined;
    const resolveRelations = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true }) ?? undefined;

    const slug = route.url.map(({ path }) => path).join('/');

    const previewMode = await preview?.preview();
    const req = storyblok.getStory(slug || defaultPath, {
        ...previewMode,
        resolve_links: resolveLinks,
        resolve_relations: resolveRelations,
    });
    return firstValueFrom(req);
};
