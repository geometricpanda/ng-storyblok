import { StoryblokNested } from '@geometricpanda/ng-storyblok';
import { ISbRichtext } from '@storyblok/js';

export type RichtextBlok = StoryblokNested<{
    content: ISbRichtext;
}>;
