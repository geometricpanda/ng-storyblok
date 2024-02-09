import { Route } from '@angular/router';
import { preloadComponentsGuard } from './preload-components.guard';
import { resolveStory } from './resolve-story.guard';
import { matchStoryblokRoute } from './storyblok-route.can-match';

export type NgSbRoute = Omit<Route, 'loadComponent' | 'loadChildren' | 'component'>;

export const ngSbRoute = (route: NgSbRoute): Route => ({
    ...route,
    loadComponent: () => import('@geometricpanda/ng-storyblok/render'),
    canMatch: [matchStoryblokRoute],
    canActivate: [preloadComponentsGuard],
    resolve: {
        ...route.resolve,
        story: resolveStory,
    },
});
