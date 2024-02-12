import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type TabBlok = StoryblokNested<{
    title: string;
    children: Array<StoryblokNested>;
}>;
