import { Route } from '@angular/router';
import { storyblokRoute } from '@geometricpanda/ng-storyblok/router';

const storyblok: Route = storyblokRoute({
    path: '**',
});

export const appRoutes: Route[] = [storyblok];
