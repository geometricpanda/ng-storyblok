import { ResolveFn } from '@angular/router';
import { ISbStory } from '@storyblok/js';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

export const resolveStory: ResolveFn<ISbStoryData> = (route) => {
    const storyData = route.data!['ɵNgStoryblokStoryData'] as ISbStory;
    return storyData.data.story;
};
