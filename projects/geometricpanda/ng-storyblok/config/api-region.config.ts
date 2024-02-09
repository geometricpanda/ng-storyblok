import { NG_STORYBLOK_API_REGION } from '@geometricpanda/ng-storyblok/tokens';
import {
    NgStoryblokApiRegionFeature,
    NgStoryblokFeatureKind,
    createNgSbFeature,
} from './_features.config';

/**
 * Provides the Storyblok API region.
 *
 * @param region The Storyblok API region.
 * @returns The provider for the Storyblok API region.
 */
export function withApiRegion(region: string): NgStoryblokApiRegionFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.ApiRegionFeature, [
        {
            provide: NG_STORYBLOK_API_REGION,
            useValue: region,
        },
    ]);
}
