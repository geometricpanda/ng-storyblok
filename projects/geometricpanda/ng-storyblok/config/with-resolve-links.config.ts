import { NG_STORYBLOK_RESOLVE_LINKS } from '@geometricpanda/ng-storyblok/tokens';
import { ISbStoryParams } from 'storyblok-js-client/src/interfaces';
import { NgStoryblokFeatureKind, NgStoryblokResolveLinksFeature, createNgSbFeature } from './_features.config';

export function withResolveLinks(links: ISbStoryParams['resolve_links']): NgStoryblokResolveLinksFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ResolveLinksFeature, [
        {
            provide: NG_STORYBLOK_RESOLVE_LINKS,
            useValue: links,
        },
    ]);
}
