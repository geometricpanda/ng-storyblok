import { StoryblokNested } from '@geometricpanda/ng-storyblok';
import { TabBlok } from '../tab/tab-blok.interface';

export type TabsBlok = StoryblokNested<{
    children: Array<TabBlok>;
}>;
