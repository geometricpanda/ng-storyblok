import { NG_STORYBLOK_TITLE_TEMPLATE, TitleTemplate } from '@geometricpanda/ng-storyblok/tokens';
import { render } from 'squirrelly';
import type { PartialConfig } from 'squirrelly/dist/types/config';
import type { CallbackFn } from 'squirrelly/dist/types/file-handlers';
import { NgStoryblokFeatureKind, NgStoryblokTitleTemplateFeature, createNgSbFeature } from './_features.config';

export function withTitleTemplate(
    // Squirelly render function
    template: string,
    // SqrlConfig config
    env?: PartialConfig,
    // CallbackFn callback
    cb?: CallbackFn,
): NgStoryblokTitleTemplateFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.TitleTemplateFeature, [
        {
            provide: NG_STORYBLOK_TITLE_TEMPLATE,
            useValue: <TitleTemplate>{
                render,
                template,
                env,
                cb,
            },
        },
    ]);
}
