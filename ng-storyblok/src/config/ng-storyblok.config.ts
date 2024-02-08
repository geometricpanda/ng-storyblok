import { makeEnvironmentProviders, Provider } from '@angular/core';
import { StoryblokClientProvider } from './storyblok-client.provider';

/**
 * Provides the Storyblok configuration.
 *
 * @param features The features to provide.
 * @returns The providers for the Storyblok configuration.
 */
export const provideNgStoryblok = (...features: Array<Provider>) =>
    makeEnvironmentProviders([...features, StoryblokClientProvider]);
