import { ISbImage, StoryblokNested } from '@geometricpanda/ng-storyblok';

export type TeaserBlok = StoryblokNested<{
    headline: string;
    image?: ISbImage;
}>;
