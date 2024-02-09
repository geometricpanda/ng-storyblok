import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
    provideNgStoryblok,
    withAccessToken,
    withBloks,
    withCache,
    withDefaultPath,
    withNgOptimisedImage,
} from '@geometricpanda/ng-storyblok/config';

import { provideClientHydration } from '@angular/platform-browser';
import { appRoutes } from './app.routes';
import { BLOK } from './cms-components';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideRouter(
            appRoutes,
            withEnabledBlockingInitialNavigation(),
            withComponentInputBinding(),
        ),
        provideNgStoryblok(
            withAccessToken('ng4mrSeUen31b5G1kAu8eQtt'),
            withDefaultPath('home'),
            // withPreview(),
            withCache(),
            withNgOptimisedImage(),
            withBloks({
                [BLOK.PAGE]: () => import('./cms-components/page-blok'),
                [BLOK.TEASER]: () => import('./cms-components/teaser-blok'),
                [BLOK.GRID]: () => import('./cms-components/grid-blok'),
                [BLOK.FEATURE]: () => import('./cms-components/feature-blok'),
            }),
        ),
    ],
};
