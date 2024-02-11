import { NG_STORYBLOK_TITLE_TEMPLATE, TitleTemplate } from '@geometricpanda/ng-storyblok/tokens';
import Mustache from 'mustache';
import { NgStoryblokFeatureKind, NgStoryblokTitleTemplateFeature, createNgSbFeature } from './_features.config';

export function withTitleTemplate(template: string): NgStoryblokTitleTemplateFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.TitleTemplateFeature, [
        {
            provide: NG_STORYBLOK_TITLE_TEMPLATE,
            useValue: <TitleTemplate>{
                template,
                fn: Mustache.render,
            },
        },
    ]);
}
