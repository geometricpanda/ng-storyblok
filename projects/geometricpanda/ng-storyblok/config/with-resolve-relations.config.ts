import { NG_STORYBLOK_RESOLVE_RELATIONS } from '@geometricpanda/ng-storyblok/tokens';
import { createNgSbFeature, NgStoryblokFeatureKind, NgStoryblokResolveRelationsFeature } from './_features.config';

export function withResolveRelations(relations: string[]): NgStoryblokResolveRelationsFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ResolveRelationsFeature, [
        {
            provide: NG_STORYBLOK_RESOLVE_RELATIONS,
            useValue: relations,
        },
    ]);
}
