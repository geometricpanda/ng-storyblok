import { StoryblokContent, StoryblokNested } from '@geometricpanda/ng-storyblok';

export type PageBlok = StoryblokContent<{
    body: Array<StoryblokNested>;
}>;
