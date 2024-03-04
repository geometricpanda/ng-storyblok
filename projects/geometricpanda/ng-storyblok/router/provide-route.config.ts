import { Route } from '@angular/router';
import { preloadComponentsGuard } from './preload-components.guard';
import { resolveStory } from './resolve-story.guard';
import { matchStoryblokRoute } from './storyblok-route.can-match';

import { StoryblokRootComponent } from '@geometricpanda/ng-storyblok/render';
import { resolveTitle } from './resolve-title.guard';

export type StoryblokRoute = Omit<Route, 'loadComponent' | 'loadChildren' | 'component'>;

export const storyblokRoute = ({ canMatch = [], canActivate = [], resolve = {}, ...props }: StoryblokRoute): Route => ({
    component: StoryblokRootComponent,
    title: resolveTitle,
    canMatch: [...canMatch, matchStoryblokRoute],
    canActivate: [...canActivate, preloadComponentsGuard],
    resolve: { ...resolve, story: resolveStory },
    ...props,
});
