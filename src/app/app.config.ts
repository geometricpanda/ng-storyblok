import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
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

import { provideIcons } from '@ng-icons/core';

import {
    remixAngularjsFill,
    remixBracesLine,
    remixDatabase2Line,
    remixFileImageLine,
    remixFileTransferLine,
    remixGitMergeLine,
    remixGlobeLine,
    remixInputCursorMove,
    remixPageSeparator,
    remixQuillPenLine,
    remixRefreshLine,
    remixServerLine,
    remixTimerFlashLine,
} from '@ng-icons/remixicon';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutes } from './app.routes';
import { BLOK } from './cms-components';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
        provideIcons({
            remixDatabase2Line,
            remixBracesLine,
            remixAngularjsFill,
            remixPageSeparator,
            remixGitMergeLine,
            remixFileTransferLine,
            remixInputCursorMove,
            remixRefreshLine,
            remixFileImageLine,
            remixTimerFlashLine,
            remixQuillPenLine,
            remixGlobeLine,
            remixServerLine,
        }),
        provideNgStoryblok(
            withAccessToken('ng4mrSeUen31b5G1kAu8eQtt'),
            withDefaultPath('home'),
            withPreview(),
            withCache(),
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
                [BLOK.ICON]: () => import('./cms-components/icon-blok'),
                [BLOK.SECTION]: () => import('./cms-components/section-blok'),
                [BLOK.SEPARATOR]: () => import('./cms-components/separator-blok'),
            }),
        ),
    ],
};
