import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type StickyBlok = StoryblokNested<{
    children: Array<StoryblokNested>;
}>;
