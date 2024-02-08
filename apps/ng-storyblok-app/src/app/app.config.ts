import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    provideNgStoryblok,
    withAccessToken,
    withApiPlugin,
    withApiRegion,
    withBloks,
    withCacheConfig,
    withDefaultPath,
} from '@geometricpanda/ng-storyblok/config';

import { appRoutes } from './app.routes';
import { BLOK } from './cms-components';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideRouter(appRoutes),
        provideNgStoryblok(
            withAccessToken('ng4mrSeUen31b5G1kAu8eQtt'),
            withApiPlugin(),
            withApiRegion('eu'),
            withCacheConfig({ type: 'none' }),
            withDefaultPath('home'),
            withBloks({
                [BLOK.PAGE]: () => import('./cms-components/page-blok'),
            }),
        ),
    ],
};
