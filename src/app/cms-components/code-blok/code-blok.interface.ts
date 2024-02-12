import { StoryblokCodePlugin, StoryblokNested } from '@geometricpanda/ng-storyblok';

export type CodeBlok = StoryblokNested<{
    code: StoryblokCodePlugin;
}>;
