import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type FeatureListBlok = StoryblokNested<{
    children: Array<StoryblokNested>;
}>;
