import { ISbComponentType } from 'storyblok-js-client/src/interfaces';

export type StoryblokNested<T = Record<string, unknown>> = ISbComponentType<string> & T;
