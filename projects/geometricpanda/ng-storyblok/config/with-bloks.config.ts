import {
    BlokLoader,
    BlokLoaders,
    NG_STORYBLOK_FALLBACK_LOADER,
    NG_STORYBLOK_LOADERS,
} from '@geometricpanda/ng-storyblok/tokens';
import FallbackBlokComponent from '../components/fallback-blok';
import { NgStoryblokBloksFeature, NgStoryblokFeatureKind, createNgSbFeature } from './_features.config';

const fallbackLoader = () => FallbackBlokComponent;

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
