import {
    BlokLoader,
    BlokLoaders,
    NG_STORYBLOK_FALLBACK_LOADER,
    NG_STORYBLOK_LOADERS,
} from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokBloksFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

const fallbackLoader = () => import('@geometricpanda/ng-storyblok/components/fallback-blok');

export function withBloks(bloks: BlokLoaders, fallback: BlokLoader = fallbackLoader): NgStoryblokBloksFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.BlokFeature, [
        {
            provide: NG_STORYBLOK_LOADERS,
            useValue: bloks,
        },
        {
            provide: NG_STORYBLOK_FALLBACK_LOADER,
            useValue: fallback,
        },
    ]);
}
