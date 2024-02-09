import { Route } from '@angular/router';
import { ngSbRoute } from '@geometricpanda/ng-storyblok/router';

const storyblok: Route = ngSbRoute({
    path: '**',
});

export const appRoutes: Route[] = [storyblok];
