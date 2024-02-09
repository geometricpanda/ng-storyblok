import { BlokLoaders, NG_STORYBLOK_LOADERS } from '@geometricpanda/ng-storyblok/tokens';
import {
    NgStoryblokBloksFeature,
    NgStoryblokFeatureKind,
    createNgSbFeature,
} from './_features.config';

export function withBloks(bloks: BlokLoaders): NgStoryblokBloksFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.BlokFeature, [
        {
            provide: NG_STORYBLOK_LOADERS,
            useValue: bloks,
        },
    ]);
}
