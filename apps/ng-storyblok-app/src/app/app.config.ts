import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
    provideNgStoryblok,
    withAccessToken,
    withApiPlugin,
    withApiRegion,
    withCacheConfig,
} from '@geometricpanda/ng-storyblok/config';
import { appRoutes } from './app.routes';

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
        ),
    ],
};
