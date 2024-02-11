import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_PREVIEW,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
    NG_STORYBLOK_SLUG_REWRITE,
    NG_STORYBLOK_TITLE_TEMPLATE,
} from '@geometricpanda/ng-storyblok/tokens';
import { firstValueFrom, map } from 'rxjs';

export const resolveTitle: ResolveFn<string> = async (route) => {
    const storyblok = inject(Storyblok);
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });
    const titleTemplate = inject(NG_STORYBLOK_TITLE_TEMPLATE, { optional: true });
    const slugRewrite = inject(NG_STORYBLOK_SLUG_REWRITE, { optional: true });
    const resolveLinks = inject(NG_STORYBLOK_RESOLVE_LINKS, { optional: true }) ?? undefined;
    const resolveRelations = inject(NG_STORYBLOK_RESOLVE_RELATIONS, { optional: true }) ?? undefined;

    const slug = route.url.map(({ path }) => path).join('/');
    const finalSlug = slugRewrite?.toStory(slug) || slug;
    const previewMode = await preview?.preview();

    const req = storyblok
        .getStory(finalSlug, {
            ...previewMode,
            resolve_links: resolveLinks,
            resolve_relations: resolveRelations,
        })
        .pipe(
            map((res) =>
                titleTemplate ? titleTemplate.fn(titleTemplate.template, res.data.story) : res.data.story.name,
            ),
        );

    return firstValueFrom(req);
};
