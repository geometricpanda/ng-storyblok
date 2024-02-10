import { ISbImage, StoryblokNested } from '@geometricpanda/ng-storyblok';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

export type ImageBlok = StoryblokNested<{
    asset: ISbImage;
    width?: number;
    height?: number;
    link?: ISbStoryData;
    priority: boolean;
}>;
