import { StoryblokContent, StoryblokNested } from '@geometricpanda/ng-storyblok/types';

export type PageBlok = StoryblokContent<{
    body: Array<StoryblokNested>;
}>;
