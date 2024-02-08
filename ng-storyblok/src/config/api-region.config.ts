import { Provider } from '@angular/core';
import { NG_STORYBLOK_API_REGION } from '@geometricpanda/ng-storyblok/tokens';

/**
 * Provides the Storyblok API region.
 *
 * @param region The Storyblok API region.
 * @returns The provider for the Storyblok API region.
 */
export const withApiRegion = (region: string): Provider => ({
    provide: NG_STORYBLOK_API_REGION,
    useValue: region,
});
