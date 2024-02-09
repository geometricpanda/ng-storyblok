import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';
import {
    NG_STORYBLOK_DEFAULT_PATH,
    NG_STORYBLOK_LOADERS,
    NG_STORYBLOK_PREVIEW,
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
    const defaultPath = inject(NG_STORYBLOK_DEFAULT_PATH);
    const preview = inject(NG_STORYBLOK_PREVIEW, { optional: true });

    const slug = route.url.map(({ path }) => path).join('/') || defaultPath;

    if (slug) {
        const previewMode = await preview?.preview();
        const req = storyblok.getStory(slug, previewMode);
        const storyData = (await firstValueFrom(req))!;

        const { data } = storyData;
        const { story } = data;
        const { content } = story;

        const components = getComponentNames(new Set<string>(), content);

        const loaders = Array.from(components).map((component) => {
            const loader = blockLoaders[component];

            if (!loader) {
                throw new Error(`ngStoryblok - NO_LOADER_FOUND
No loader found for blok: ${component}`);
            }

            return Promise.resolve(loader());
        });

        await Promise.all(loaders);
    }

    return true;
};
