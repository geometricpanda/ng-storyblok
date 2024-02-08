import { NG_STORYBLOK_DEFAULT_PATH } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokDefaultPathFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

export function withDefaultPath(path: string): NgStoryblokDefaultPathFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.DefaultPathFeature, [
        {
            provide: NG_STORYBLOK_DEFAULT_PATH,
            useValue: path,
        },
    ]);
}

export function withoutDefaultPath(): NgStoryblokDefaultPathFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.DefaultPathFeature, [
        {
            provide: NG_STORYBLOK_DEFAULT_PATH,
            useValue: undefined,
        },
    ]);
}
