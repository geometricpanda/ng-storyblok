import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_PREVIEW,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
    NG_STORYBLOK_SLUG_REWRITE,
} from '@geometricpanda/ng-storyblok/tokens';
import { ISbStory } from '@storyblok/js';
import { firstValueFrom } from 'rxjs';

export const resolveStory: ResolveFn<ISbStory> = async (route) => {
    const storyblok = inject(Storyblok);
    const slugRewrite = inject(NG_STORYBLOK_SLUG_REWRITE, { optional: true });
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });
    const resolveLinks = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true }) ?? undefined;
    const resolveRelations = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true }) ?? undefined;

    const slug = route.url.map(({ path }) => path).join('/');
    const finalSlug = slugRewrite?.toStory(slug) || slug;

    const previewMode = await preview?.preview();
    const req = storyblok.getStory(finalSlug, {
        ...previewMode,
        resolve_links: resolveLinks,
        resolve_relations: resolveRelations,
    });

    return firstValueFrom(req);
};
