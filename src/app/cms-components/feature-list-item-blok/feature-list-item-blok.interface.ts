import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type FeatureListItemBlok = StoryblokNested<{
    icon: Array<StoryblokNested>;
    text: Array<StoryblokNested>;
}>;
