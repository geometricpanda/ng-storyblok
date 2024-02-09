import { NG_STORYBLOK_API_PLUGIN } from '@geometricpanda/ng-storyblok/tokens';
import { apiPlugin } from '@storyblok/js';
import {
    NgStoryblokApiPluginFeature,
    NgStoryblokFeatureKind,
    createNgSbFeature,
} from './_features.config';

/**
 * Provides the Storyblok API plugin.
 *
 * @returns The provider for the Storyblok API plugin.
 */
export function withApiPlugin(): NgStoryblokApiPluginFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ApiPluginFeature, [
        {
            provide: NG_STORYBLOK_API_PLUGIN,
            useValue: apiPlugin,
        },
    ]);
}
