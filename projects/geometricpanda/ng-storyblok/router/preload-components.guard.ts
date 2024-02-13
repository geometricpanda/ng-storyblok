import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NG_STORYBLOK_FALLBACK_LOADER, NG_STORYBLOK_LOADERS } from '@geometricpanda/ng-storyblok/tokens';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getComponentNames = (acc: Set<string>, block: any): Set<string> => {
    if (!block) {
        return acc;
    }

    if (Array.isArray(block)) {
        block.forEach((item) => getComponentNames(acc, item));
    }

    if (typeof block === 'object') {
        // If it's a storyblok link to another document
        if (block['linktype'] && block['uuid']) {
            return acc;
        }

        if (block.component) {
            acc.add(block.component);
        }

        Object.values(block).forEach((child) => getComponentNames(acc, child));
    }

    return acc;
};

export const preloadComponentsGuard: CanActivateFn = async (route) => {
    const blockLoaders = inject(NG_STORYBLOK_LOADERS);
    const fallbackLoader = inject(NG_STORYBLOK_FALLBACK_LOADER);

    const storyData = route.data!['ɵNgStoryblokStoryData'];
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

    route.data = {
        ...route.data,
        ɵNgStoryblokComponents: components,
    };

    return true;
};
