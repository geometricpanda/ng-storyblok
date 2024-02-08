import { Route } from '@angular/router';
import { resolveStory } from './resolve-story.guard';

export type NgSbRoute = Omit<Route, 'loadComponent' | 'loadChildren' | 'component'>;

export const ngSbRoute = (route: NgSbRoute): Route => ({
    ...route,
    loadComponent: () => import('@geometricpanda/ng-storyblok/render'),
    resolve: {
        ...route.resolve,
        story: resolveStory,
    },
});
