import { Route } from '@angular/router';
import { preloadComponentsGuard } from './preload-components.guard';
import { resolveStory } from './resolve-story.guard';
import { matchStoryblokRoute } from './storyblok-route.can-match';

import { StoryblokRootComponent } from '@geometricpanda/ng-storyblok/render';
import { resolveTitle } from './resolve-title.guard';

export type StoryblokRoute = Omit<Route, 'loadComponent' | 'loadChildren' | 'component'>;

export const storyblokRoute = (route: StoryblokRoute): Route => ({
    ...route,
    component: StoryblokRootComponent,
    title: resolveTitle,
    canMatch: [matchStoryblokRoute],
    canActivate: [preloadComponentsGuard],
    resolve: {
        ...route.resolve,
        story: resolveStory,
    },
});
