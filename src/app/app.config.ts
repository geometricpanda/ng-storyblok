import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, ɵprovideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import {
    provideNgStoryblok,
    withAccessToken,
    withBloks,
    withBridge,
    withDefaultPath,
    withNgOptimizedImage,
    withPreview,
    withResolveLinks,
    withResolveRelations,
} from '@geometricpanda/ng-storyblok/config';

import { appRoutes } from './app.routes';
import { BLOK } from './cms-components';

export const appConfig: ApplicationConfig = {
    providers: [
        ɵprovideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
        provideNgStoryblok(
            withAccessToken('ng4mrSeUen31b5G1kAu8eQtt'),
            withDefaultPath('home'),
            withPreview(),
            // withCache(),
            withBridge(),
            withNgOptimizedImage(),
            withResolveLinks('story'),
            withResolveRelations(['image.link']),
            withBloks({
                [BLOK.PAGE]: () => import('./cms-components/page-blok'),
                [BLOK.HERO]: () => import('./cms-components/hero-blok'),
                [BLOK.TEXT]: () => import('./cms-components/text-blok'),
                [BLOK.IMAGE]: () => import('./cms-components/image-blok'),
                [BLOK.RICHTEXT]: () => import('./cms-components/richtext-blok'),
                [BLOK.FEATURE_LIST]: () => import('./cms-components/feature-list-blok'),
                [BLOK.FEATURE_LIST_ITEM]: () => import('./cms-components/feature-list-item-blok'),
            }),
        ),
    ],
};
