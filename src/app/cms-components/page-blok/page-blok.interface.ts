import { StoryblokContent, StoryblokNested } from '@geometricpanda/ng-storyblok';

export type PageBlok = StoryblokContent<{
    before: Array<StoryblokNested>;
    main: Array<StoryblokNested>;
    aside: Array<StoryblokNested>;
    after: Array<StoryblokNested>;
}>;
