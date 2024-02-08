import { Route } from '@angular/router';
import { ngSbRoute } from '@geometricpanda/ng-storyblok/router';

const home: Route = ngSbRoute({
    path: '',
});

const dynamic: Route = ngSbRoute({
    path: '**',
});

export const appRoutes: Route[] = [home, dynamic];
