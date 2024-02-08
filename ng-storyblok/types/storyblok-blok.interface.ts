import { InputSignal } from '@angular/core';
import { StoryblokContent } from './storyblok-content-blok.interface';
import { StoryblokNested } from './storyblok-nested-blok.interface';

export interface StoryblokBlok<T = StoryblokContent | StoryblokNested> {
    blok: InputSignal<T>;
}
