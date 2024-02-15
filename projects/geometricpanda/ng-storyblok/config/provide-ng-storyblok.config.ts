import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { makeEnvironmentProviders } from '@angular/core';
import { storyblokInterceptor } from '@geometricpanda/ng-storyblok/services';
import { NgStoryblokFeatures } from './_features.config';
import { StoryblokClientProvider } from './storyblok-client.provider';

/**
 * Provides the Storyblok configuration.
 *
 * @param features The features to provide.
 * @returns The providers for the Storyblok configuration.
 */
export const provideNgStoryblok = (...features: Array<NgStoryblokFeatures | false>) =>
    makeEnvironmentProviders([
        features.filter(Boolean).map((feature) => feature && feature?.ɵproviders),
        StoryblokClientProvider,
        provideHttpClient(withInterceptors([storyblokInterceptor])),
    ]);
