import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type GridBlok = StoryblokNested<{
    columns: Array<StoryblokNested>;
}>;
