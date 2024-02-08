import { makeEnvironmentProviders } from '@angular/core';
import { NgStoryblokFeatures } from './_features.config';
import { StoryblokClientProvider } from './storyblok-client.provider';

/**
 * Provides the Storyblok configuration.
 *
 * @param features The features to provide.
 * @returns The providers for the Storyblok configuration.
 */
export const provideNgStoryblok = (...features: Array<NgStoryblokFeatures>) =>
    makeEnvironmentProviders([features.map((feature) => feature.ɵproviders), StoryblokClientProvider]);
