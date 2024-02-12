import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type TextBlok = StoryblokNested<{
    element: 'h1' | 'h2' | 'h3' | 'p';
    style: 'headline' | 'strapline' | 'title' | 'subtitle' | 'lead' | 'paragraph' | 'small';
    content: string;
    inThisPage: boolean;
}>;
