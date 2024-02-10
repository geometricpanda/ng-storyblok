import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type HeroBlok = StoryblokNested<{
    children: Array<StoryblokNested>;
}>
