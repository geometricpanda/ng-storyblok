import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type TextBlok = StoryblokNested<{
    element: 'h1' | 'h2' | 'h3' | 'p';
    style: 't100' | 't200' | 't300' | 't400' | 't500' | 't600' | 't700' | 't800' | 't900';
    content: string;
    gradient: boolean;
}>;
