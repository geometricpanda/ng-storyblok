import { ISbComponentType } from 'storyblok-js-client/src/interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type StoryblokNested<T = Record<string, unknown>> = ISbComponentType<string> & T;
