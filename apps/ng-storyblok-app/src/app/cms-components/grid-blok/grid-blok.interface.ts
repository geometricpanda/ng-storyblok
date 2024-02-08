import { StoryblokNested } from '@geometricpanda/ng-storyblok/types';

export type GridBlok = StoryblokNested<{
    columns: Array<StoryblokNested>;
}>;
