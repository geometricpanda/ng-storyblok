import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
} from '@angular/router';

import {
    provideNgStoryblok,
    withAccessToken,
    withBloks,
    withBridge,
    withCache,
    withNgOptimizedImage,
    withPreview,
    withResolveLinks,
    withResolveRelations,
    withTitleTemplate,
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
import { withSlugRewrite } from '../../projects/geometricpanda/ng-storyblok/config/with-slug-rewrite.config';
import { appRoutes } from './app.routes';
import { BLOK } from './cms-components';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        provideRouter(
            appRoutes,
            withEnabledBlockingInitialNavigation(),
            withComponentInputBinding(),
            withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
        ),
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
            withPreview(),
            withBridge(),
            withCache(),
            withNgOptimizedImage(),
            withResolveLinks('story'),
            withResolveRelations(['image.link']),
            withTitleTemplate('{{name}} • ngStoryblok'),
            withSlugRewrite(
                (slug) => slug || 'home',
                (slug) => (slug === 'home' ? '/' : slug),
            ),
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
                [BLOK.STICKY]: () => import('./cms-components/sticky-blok'),
                [BLOK.CODE]: () => import('./cms-components/code-blok'),
                [BLOK.IN_THIS_PAGE]: () => import('./cms-components/in-this-page-blok'),
            }),
        ),
    ],
};
