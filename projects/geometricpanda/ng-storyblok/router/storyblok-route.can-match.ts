import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_PREVIEW,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
} from '@geometricpanda/ng-storyblok/tokens';
import { firstValueFrom } from 'rxjs';

export const matchStoryblokRoute: CanMatchFn = async (route, segments) => {
    const storyblok = inject(Storyblok);
    const defaultPath = inject(NG_STORYBLOK_DEFAULT_PATH, { optional: true });
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });
    const resolveLinks = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true }) ?? undefined;
    const resolveRelations = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true }) ?? undefined;

    const slug = segments.map((segment) => segment.path).join('/') || defaultPath;

    if (slug) {
        const previewMode = await preview?.preview();
        const req = storyblok.getStory(slug, {
            ...previewMode,
            resolve_links: resolveLinks,
            resolve_relations: resolveRelations,
        });
        return firstValueFrom(req).then((story) => !!story);
    }

    return false;
};
