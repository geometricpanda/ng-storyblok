import { NG_STORYBLOK_SLUG_REWRITE, RewriteFn, SlugRewrite } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokFeatureKind, NgStoryblokSlugRewriteFeature, createNgSbFeature } from './_features.config';

export function withSlugRewrite(toStory: RewriteFn, toUrl: RewriteFn): NgStoryblokSlugRewriteFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.SlugRewriteFeature, [
        {
            provide: NG_STORYBLOK_SLUG_REWRITE,
            useValue: <SlugRewrite>{
                toStory,
                toUrl,
            },
        },
    ]);
}
