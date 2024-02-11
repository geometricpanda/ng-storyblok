import { StoryblokNested } from '@geometricpanda/ng-storyblok';

export type IconBlok = StoryblokNested<{
    icon: string;
    color: 'info' | 'success' | 'warning' | 'danger';
    size: '1' | '1.5' | '2' | '3';
}>;
