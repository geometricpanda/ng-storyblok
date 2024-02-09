import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, ɵprovideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import {
    provideNgStoryblok,
    withAccessToken,
    withBloks,
    withBridge,
    withCache,
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
            withCache(),
            withBridge(),
            withNgOptimizedImage(),
            withResolveLinks('story'),
            withResolveRelations(['feature.link']),
            withBloks({
                [BLOK.PAGE]: () => import('./cms-components/page-blok'),
                [BLOK.TEASER]: () => import('./cms-components/teaser-blok'),
                [BLOK.GRID]: () => import('./cms-components/grid-blok'),
                [BLOK.FEATURE]: () => import('./cms-components/feature-blok'),
            }),
        ),
    ],
};
