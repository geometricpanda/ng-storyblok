import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_FALLBACK_LOADER,
    NG_STORYBLOK_LOADERS,
    NG_STORYBLOK_PREVIEW,
    NG_STORYBLOK_RESOLVE_LINKS,
    NG_STORYBLOK_RESOLVE_RELATIONS,
    NG_STORYBLOK_SLUG_REWRITE,
} from '@geometricpanda/ng-storyblok/tokens';
import { firstValueFrom } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getComponentNames = (acc: Set<string>, block: any): Set<string> => {
    if (!block) {
        return acc;
    }

    if (Array.isArray(block)) {
        block.forEach((item) => getComponentNames(acc, item));
    }

    if (typeof block === 'object') {
        if (block.component) {
            acc.add(block.component);
        }

        Object.values(block).forEach((child) => getComponentNames(acc, child));
    }

    return acc;
};

export const preloadComponentsGuard: CanActivateFn = async (route) => {
    const storyblok = inject(Storyblok);
    const blockLoaders = inject(NG_STORYBLOK_LOADERS);
    const fallbackLoader = inject(NG_STORYBLOK_FALLBACK_LOADER);
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

    const storyData = (await firstValueFrom(req))!;

    const { data } = storyData;
    const { story } = data;
    const { content } = story;

    const components = getComponentNames(new Set<string>(), content);

    const loaders = Array.from(components).map((component) => {
        const loader = blockLoaders[component];

        if (!loader) {
            return fallbackLoader();
        }

        return loader();
    });

    await Promise.all(loaders);

    return true;
};
