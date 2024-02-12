import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type SectionBlok = StoryblokNested<{
    children: Array<StoryblokNested>;
    paddingTop: 'sm' | 'md' | 'lg' | 'xl' | 'none';
    paddingBottom: 'sm' | 'md' | 'lg' | 'xl' | 'none';
    gap: boolean;
    maxWidth?: 'single' | 'double';
}>;
