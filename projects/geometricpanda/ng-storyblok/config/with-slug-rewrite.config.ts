import { NG_STORYBLOK_SLUG_REWRITE, SlugRewrite } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokFeatureKind, NgStoryblokSlugRewriteFeature, createNgSbFeature } from './_features.config';

export function withSlugRewrite(fn: SlugRewrite): NgStoryblokSlugRewriteFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.SlugRewriteFeature, [
        {
            provide: NG_STORYBLOK_SLUG_REWRITE,
            useValue: fn,
        },
    ]);
}
